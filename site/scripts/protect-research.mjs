import { readFile, writeFile, mkdir, rename } from 'node:fs/promises';
import { webcrypto } from 'node:crypto';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const { values }=parseArgs({options:{archive:{type:'string'},output:{type:'string'}}});
if(!values.archive)throw new Error('Usage: node scripts/protect-research.mjs --archive <private ZIP path>');
const output=values.output?resolve(values.output):fileURLToPath(new URL('../public/research/private/overview.bin',import.meta.url));

async function readPassword(){
  process.stdout.write('Enter overview password (input hidden):\n');
  process.stdin.setEncoding('utf8');
  if(process.stdin.isTTY)process.stdin.setRawMode(true);
  let value='';
  return new Promise((resolve,reject)=>{
    const finish=()=>{process.stdin.off('data',onData);if(process.stdin.isTTY)process.stdin.setRawMode(false);process.stdin.pause();};
    const onData=chunk=>{
      for(const char of chunk){
        if(char==='\u0003'){finish();reject(new Error('Cancelled'));return;}
        if(char==='\r'||char==='\n'){finish();resolve(value);return;}
        if(char==='\u007f'||char==='\b')value=value.slice(0,-1);else value+=char;
      }
    };
    process.stdin.on('data',onData);process.stdin.resume();
  });
}

let password=await readPassword();
if(!password)throw new Error('Password must not be empty.');
const plaintext=await readFile(resolve(values.archive));
if(plaintext.readUInt32LE(0)!==0x04034b50)throw new Error('The source must be a ZIP archive.');
// Format v1: 12-byte magic, iterations (u32 BE), salt (16), nonce (12), ciphertext + GCM tag.
const header=new Uint8Array(44);
header.set(new TextEncoder().encode('ACRESEARCH01'));
new DataView(header.buffer).setUint32(12,600_000);
webcrypto.getRandomValues(header.subarray(16,32));webcrypto.getRandomValues(header.subarray(32,44));
const passwordBytes=new TextEncoder().encode(password);password='';
const material=await webcrypto.subtle.importKey('raw',passwordBytes,'PBKDF2',false,['deriveKey']);passwordBytes.fill(0);
const key=await webcrypto.subtle.deriveKey({name:'PBKDF2',salt:header.slice(16,32),iterations:600_000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
const params={name:'AES-GCM',iv:header.slice(32,44),additionalData:header,tagLength:128};
const encrypted=new Uint8Array(await webcrypto.subtle.encrypt(params,key,plaintext));
const check=new Uint8Array(await webcrypto.subtle.decrypt(params,key,encrypted));
if(!Buffer.from(check).equals(plaintext))throw new Error('Encryption verification failed.');
check.fill(0);plaintext.fill(0);
await mkdir(dirname(output),{recursive:true});
await writeFile(`${output}.tmp`,Buffer.concat([header,encrypted]));await rename(`${output}.tmp`,output);
console.log(`Encrypted overview written and verified (${encrypted.byteLength} bytes). No password or plaintext archive was saved to the site.`);
