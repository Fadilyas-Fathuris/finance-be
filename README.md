# Finance Management System Backend 💼🚀

Backend service untuk sistem manajemen keuangan **Niskala Group** (Multi-Unit: Niskala, Aksalab, Snapcala) yang dibangun menggunakan [NestJS](https://nestjs.com/) dan [Prisma ORM](https://www.prisma.io/).

---

## 🛠️ Tech Stack
- **Framework**: NestJS v11 (TypeScript)
- **Database**: PostgreSQL
- **ORM**: Prisma v7 (`@prisma/adapter-pg`)
- **API Documentation**: Swagger / OpenAPI (tersedia di `/api`)

---

## 🚀 Setup & Menjalankan Proyek

### 1. Install Dependencies
```bash
npm install
```

### 2. Konfigurasi Environment
Salin file `.env.example` ke `.env` dan sesuaikan koneksi database PostgreSQL Anda:
```bash
cp .env.example .env
```

### 3. Database Migration & Seeding
```bash
# Generate Prisma Client
npm run db:generate

# Jalankan migrasi database
npm run db:migrate

# Inisialisasi akun pengguna default (CEO, CFO, Manager, Staff)
npm run db:seed
```

### 4. Menjalankan Server
```bash
# Development (watch mode)
npm run start:dev

# Production build & run
npm run build
npm run start:prod
```

Swagger API Documentation dapat diakses di: `http://localhost:3000/api`

---

## 🧹 Database Management & Pembersihan Data Dummy

Tersedia command siap pakai untuk mengelola database:

| Command | Keterangan |
| :--- | :--- |
| `npm run db:generate` | Generate Prisma Client |
| `npm run db:migrate` | Migrasi schema database (Development) |
| `npm run db:migrate:deploy` | Terapkan migrasi ke database Production |
| `npm run db:seed` | Inisialisasi / upsert akun default pengguna |
| `npm run db:clean` | **Membersihkan semua data dummy/testing (Transaksi, Invoice, Proyek, dll) namun MENJAGA data akun `User` tetap utuh** |

> [!TIP]
> Jalankan `npm run db:clean` ketika sistem siap diserahkan ke klien/tim operasional agar seluruh data dummy terhapus dan sistem bersih siap pakai, tanpa kehilangan akses login akun.

---

## 🚢 Panduan Deployment Produksi

Panduan lengkap mengenai langkah-langkah deployment, konfigurasi environment produksi, PM2 process management, dan checklist go-live tersedia di:

👉 **[Lihat Panduan Deployment Lengkap (DEPLOYMENT.md)](./DEPLOYMENT.md)**

---

## 📄 License
UNLICENSED (Internal Niskala Group).
