import {Buffer} from 'buffer';

export function generateUniqueId(name: string, phone: string): string {
  const timestamp = Date.now(); // Milliseconds since epoch
  const cleanName = name.trim().replace(/\s+/g, '').toLowerCase(); // e.g., "John Doe" → "johndoe"
  return `${cleanName}_${phone}_${timestamp}`;
}


function toBase64(str: string): string {
  return Buffer.from(str).toString('base64').replace(/=+$/, ''); // Remove padding
}

export function generateShortId(name: string, phone: string): string {
  const timestamp = Date.now().toString();
  const input = `${name.trim().toLowerCase()}_${phone}_${timestamp}`;
  return toBase64(input).slice(0, 16); // shorten
}
