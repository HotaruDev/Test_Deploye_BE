# Dokumentasi Menjalankan Perintah di Project

Dokumen ini menjelaskan cara menjalankan perintah-perintah penting yang sudah disediakan di `package.json`, termasuk perintah database (Sequelize CLI) dan perintah lain untuk development maupun production.

## Daftar Perintah Database (Sequelize CLI)

### Untuk Development (TypeScript/ESM)
Gunakan perintah berikut untuk menjalankan dengan dukungan TypeScript:

| Perintah | Fungsi |
|---|---|
| `npm run db:migrate-esm` | Menjalankan semua migrasi |
| `npm run db:migrate:undo-esm` | Membatalkan migrasi terakhir |
| `npm run db:migrate:undo:all-esm` | Membatalkan semua migrasi |
| `npm run db:migrate:status-esm` | Melihat status migrasi |
| `npm run db:seed-esm` | Menjalankan satu seed |
| `npm run db:seed:all-esm` | Menjalankan semua seed |
| `npm run db:seed:undo-esm` | Membatalkan satu seed terakhir |
| `npm run db:seed:undo:all-esm` | Membatalkan semua seed |
| `npm run db:migration:generate-esm -- nama_migration` | Membuat file migration baru |
| `npm run db:seed:generate-esm -- nama_seed` | Membuat file seed baru |

### Untuk Production (JavaScript)
Setelah project dibuild ke JavaScript, gunakan perintah berikut:

| Perintah | Fungsi |
|---|---|
| `npm run db:migrate` | Menjalankan semua migrasi |
| `npm run db:migrate:undo` | Membatalkan migrasi terakhir |
| `npm run db:migrate:undo:all` | Membatalkan semua migrasi |
| `npm run db:migrate:status` | Melihat status migrasi |
| `npm run db:seed` | Menjalankan satu seed |
| `npm run db:seed:all` | Menjalankan semua seed |
| `npm run db:seed:undo` | Membatalkan satu seed terakhir |
| `npm run db:seed:undo:all` | Membatalkan semua seed |
| `npm run db:migration:generate -- nama_migration` | Membuat file migration baru |
| `npm run db:seed:generate -- nama_seed` | Membuat file seed baru |

## Perintah Lain di package.json

| Perintah | Fungsi |
|---|---|
| `npm run dev` | Menjalankan server development dengan hot reload (nodemon + ts-node/esm) |
| `npm run build` | Build project TypeScript ke JavaScript (output di folder `dist/`) |
| `npm start` | Menjalankan server production dari hasil build (dist/server.js) |
| `npm run generate-docs` | Generate dokumentasi Swagger (setelah build) |
| `npm test` | Menjalankan test (saat ini hanya placeholder) |

## Contoh Penggunaan

- **Menjalankan server development:**
  ```bash
  npm run dev
  ```
- **Build project ke JavaScript:**
  ```bash
  npm run build
  ```
- **Menjalankan server production:**
  ```bash
  npm start
  ```
- **Generate dokumentasi Swagger:**
  ```bash
  npm run generate-docs
  ```
- **Menjalankan migrasi:**
  ```bash
  npm run db:migrate-esm
  # atau setelah build
  npm run db:migrate
  ```
- **Membuat migration baru:**
  ```bash
  npm run db:migration:generate-esm -- add-users-table
  # atau setelah build
  npm run db:migration:generate -- add-users-table
  ```
- **Menjalankan semua seed:**
  ```bash
  npm run db:seed:all-esm
  # atau setelah build
  npm run db:seed:all
  ```

## Catatan
- Untuk perintah yang berakhiran `-esm`, pastikan environment sudah mendukung TypeScript dan ESM.
- Untuk production, pastikan sudah menjalankan `npm run build` sebelum menjalankan perintah tanpa `-esm`.
- Nama migration/seed bisa diganti sesuai kebutuhan.
- Untuk perintah selain database, pastikan sudah install dependencies (`npm install`) sebelum menjalankan. 