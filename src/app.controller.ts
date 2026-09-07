import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { scryptSync, timingSafeEqual } from 'crypto';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('Authentication & Users')
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prisma: PrismaService,
  ) {}

  private sanitizeUser(user: {
    id: string;
    email: string;
    name: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  private verifyPassword(password: string, storedHash: string) {
    const [algorithm, salt, hash] = storedHash.split(':');
    if (algorithm !== 'scrypt' || !salt || !hash) return false;

    const hashBuffer = Buffer.from(hash, 'hex');
    const passwordBuffer = scryptSync(password, salt, hashBuffer.length);
    return timingSafeEqual(hashBuffer, passwordBuffer);
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiOperation({ summary: 'Get all seeded users for mock profile switcher' })
  @Get('users')
  async getUsers() {
    const users = await this.prisma.user.findMany({
      orderBy: { name: 'asc' },
    });
    return users.map((user) => this.sanitizeUser(user));
  }

  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'ceo@niskala.id' },
        password: { type: 'string', example: 'Password123!' },
      },
      required: ['email', 'password'],
    },
  })
  @Post('auth/login')
  async login(@Body('email') email: string, @Body('password') password: string) {
    if (!email || !password) {
      throw new HttpException('Email and password are required', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user || !this.verifyPassword(password, user.passwordHash)) {
      throw new HttpException('Invalid email or password', HttpStatus.UNAUTHORIZED);
    }
    return this.sanitizeUser(user);
  }
}
