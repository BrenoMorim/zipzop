import { hashSync, compareSync } from 'bcrypt';

// Salt to be used to protect make the hash generation less predictable
const saltRounds = 10;

// Generates a hash for the user's password
export function hashPassword(password) {
    return hashSync(password, saltRounds);
}

// Verify the user password
export function verifyHash(hash, password) {
    return compareSync(password, hash);
}