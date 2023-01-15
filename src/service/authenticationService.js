import { hashSync, compareSync } from 'bcrypt';

// Salt to be used to protect make the hash generation less predictable
const saltRounds = 10;

export function hashPassword(password) {
    return hashSync(password, saltRounds);
}

export function verifyHash(hash, password) {
    return compareSync(password, hash);
}