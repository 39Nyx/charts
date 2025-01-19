import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, '../dist');
const indexHtmlPath = path.join(distPath, 'index.html');
const notFoundHtmlPath = path.join(distPath, '404.html');

fs.createReadStream(indexHtmlPath).pipe(fs.createWriteStream(notFoundHtmlPath));
