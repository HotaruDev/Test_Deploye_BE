import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import swaggerSpec from '../config/swagger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const docsDir = path.resolve(__dirname, '../../doc');
const swaggerFilePath = path.resolve(docsDir, 'swagger.json');

if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}

fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerSpec, null, 2));
console.log(`Swagger documentation generated at: ${swaggerFilePath}`); 