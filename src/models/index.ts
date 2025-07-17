import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, Options } from 'sequelize';
import _config from '../config/config.js'; // Import konfigurasi dari src/config/config.ts

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config: Options = _config[env]; // Dapatkan konfigurasi lingkungan yang spesifik

const db: any = {}; 

let sequelize: Sequelize;
// Pastikan database, username, dan password tidak null/undefined sesuai tipe Options
sequelize = new Sequelize(config.database!, config.username!, config.password, {
  host: config.host,
  dialect: config.dialect,
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    // Filter untuk file TypeScript dan kecualikan file index.ts ini sendiri, serta file deklarasi
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.ts' && // Cari file .ts
      file.indexOf('.d.ts') === -1 // Kecualikan file .d.ts
    );
  })
  .forEach(async (file) => {
    const modelDefiner = await import(path.join(__dirname, file));
    // Periksa apakah itu default export ES module atau module.exports CommonJS
    const model = (modelDefiner.default || modelDefiner)(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
