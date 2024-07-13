import fetch from 'node-fetch';
import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function qrcode(message) {
  const url = `https://api.qrserver.com/v1/create-qr-code/?size=600x600&data=${encodeURIComponent(message)}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch the image. Status: ${response.status}`);

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  
  const filePath = resolve(__dirname, 'qrcode.png');

  writeFileSync(filePath, buffer);
  return filePath;
}


// await qrcode('seu link aqui');
