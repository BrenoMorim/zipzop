import db from "../db/db.js";
import { hashPassword, verifyHash } from "./authenticationService.js";

export function createUser(nickname, email, password) {
    const hash = hashPassword(password);

    if (getUser(email) != undefined) {
        return `The email ${email} is already being used`;
    }

    db.prepare("INSERT INTO people (nickname, email, hash) VALUES (?, ?, ?);").run(nickname, email, hash);
    return "";   
}

export function getUser(email) {
    return db.prepare("SELECT * FROM people WHERE email = ?;").get(email);
}

export function verifyLogin(email, password) {
    
    const user = getUser(email);

    // If there isn't a user with the email
    if (user == undefined) return false;
    return verifyHash(user.hash, password);
}