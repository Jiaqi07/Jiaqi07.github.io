/** Decrypt the versioned, authenticated archive produced by scripts/protect-research.mjs. */
export async function decryptResearchArchive(envelope:ArrayBuffer,password:string):Promise<Uint8Array<ArrayBuffer>> {
  if(!crypto.subtle)throw new Error('A secure connection is required.');
  if(envelope.byteLength<60)throw new Error('Invalid protected overview.');
  const header=new Uint8Array(envelope.slice(0,44));
  if(new TextDecoder().decode(header.subarray(0,12))!=='ACRESEARCH01')throw new Error('Unsupported overview format.');
  const iterations=new DataView(header.buffer).getUint32(12);
  if(iterations!==600_000)throw new Error('Unsupported overview format.');
  const bytes=new TextEncoder().encode(password);
  const material=await crypto.subtle.importKey('raw',bytes,'PBKDF2',false,['deriveKey']);bytes.fill(0);
  const key=await crypto.subtle.deriveKey({name:'PBKDF2',salt:header.slice(16,32),iterations,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['decrypt']);
  return new Uint8Array(await crypto.subtle.decrypt({name:'AES-GCM',iv:header.slice(32,44),additionalData:header,tagLength:128},key,envelope.slice(44)));
}
