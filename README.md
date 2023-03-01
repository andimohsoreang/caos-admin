
# Admin CAOS

A brief description of what this project does and who it's for


## Instalasi

Clone Repo

```bash
  git clone https://github.com/andimohsoreang/caos-admin.git
  cd caos-admin
```

Configs

```bash
  cp config/config.example.json config/config.json
  npm install
```

Migrations, seeders

```bash
  npx sequelize-cli db:migrate
  npx sequelize-cli db:seed:all
```

Undo migrations or seeders (opsional)

```bash
  npx sequelize-cli db:migrate:undo
  npx sequelize-cli db:seed:undo:all
```

Run

```bash
  npm start
```

## Todo

[x] Klasifikasi untuk laporan berdasarkan status gizi
[ ] Perbaiki hak akses web portal admin (admin puskes, posyandu, super admin)
[x] Cek pengukuran di bulan yang sama (duplicate row)
[ ] Pengisian form "Umur" otomatis berdasarkan tanggal lahir dan tanggal pengukuran
[ ] Fix Middleware login semua route
[ ] Buat endpoint kalkulator stunting

## Notes

### Hak Akses (Web Portal Admin)

#### Super Admin

Semua Fitur

#### Admin Puskesmas 

- Laporan
- Lihat Pengukuran
- Edit Profil Puskesmas
- Tambah Posyandu

#### Admin Posyandu

- Submit Pengukuran 
- Edit Profil Posyandu
- Buat Akun Orang Tua
- Tambah Balita