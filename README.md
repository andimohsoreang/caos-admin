
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