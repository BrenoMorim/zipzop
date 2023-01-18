import crypto from "crypto";

const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = process.env.ENCRYPTION_KEY || 'passwordpasswordpasswordpassword';
const iv = Buffer.from(process.env.ENCRYPTION_IV || 'passwordpassword');

// Encrypting message
export function encrypt(message) {
   let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
   let encrypted = cipher.update(message);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   return `${iv.toString('hex')}.${encrypted.toString('hex')}`;
}

// Decrypting message
export function decrypt(message) {
   let iv = Buffer.from(message.split('.')[0], 'hex');
   let encryptedMessage = Buffer.from(message.split('.')[1], 'hex');
   let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
   let decrypted = decipher.update(encryptedMessage);
   decrypted = Buffer.concat([decrypted, decipher.final()]);
   return decrypted.toString();
}
