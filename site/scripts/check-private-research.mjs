import { readdir, readFile } from 'node:fs/promises';
const directory = new URL('../public/research/private/', import.meta.url);
const entries = await readdir(directory);
if (entries.length !== 1 || entries[0] !== 'overview.bin') throw new Error('Only the encrypted overview.bin belongs in public/research/private.');
const bytes = await readFile(new URL('overview.bin', directory));
if (bytes.length < 60 || bytes.subarray(0, 12).toString() !== 'ACRESEARCH01' || bytes.readUInt32BE(12) !== 600000) throw new Error('Invalid encrypted research payload.');
console.log('Private research payload verified; no plaintext files in its public directory.');
