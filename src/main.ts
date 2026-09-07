import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Aktifkan CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // ===== KONFIGURASI SWAGGER =====
  const config = new DocumentBuilder()
    .setTitle('Niskala Finance API')
    .setDescription('Dokumentasi API Interaktif untuk Sistem Manajemen Keuangan Start-up Niskala')
    .setVersion('1.0')
    .addTag('Transactions', 'Manajemen Arus Kas Masuk & Keluar')
    .addTag('Subscribers', 'Manajemen Produk Bisnis & Klien Berlangganan')
    .addTag('Projects', 'Manajemen Proyek & Piutang Klien')
    .addTag('Opex', 'Manajemen Pengeluaran Operasional Tetap')
    .addTag('Employees', 'Manajemen SDM & Payroll Karyawan')
    .addTag('Budget', 'Manajemen Target & Alokasi Anggaran')
    .addTag('Invoices', 'Pembuatan & Pengelolaan Invoice Penagihan')
    .addTag('Profit Share', 'Manajemen Skema Bagi Hasil Mitra')
    .addTag('Quotations', 'Pembuatan Quotation & Statement of Work')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  
  // Endpoint Swagger UI akan diakses melalui http://localhost:3000/api/docs
  SwaggerModule.setup('api/docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Backend Niskala Finance aktif di: http://localhost:${port}`);
  console.log(`Swagger UI aktif di: http://localhost:${port}/api/docs`);
}
bootstrap();
