import db from "../db/db.js";
import { hashPassword, verifyHash } from "./authenticationService.js";
import userDto from "./userDto.js";

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

export function getUserDto(email) {
    return userDto(getUser(email));
}

export function verifyLogin(email, password) {
    
    const user = getUser(email);

    // If there isn't a user with the email
    if (user == undefined) return false;
    return verifyHash(user.hash, password);
}

export function updateUserNickname(email, newNickname) {
    db.prepare("UPDATE people SET nickname = ? WHERE email = ?;").run(newNickname, email);
}

export function updateUserPassword(email, newPassword) {
    const hashedPassword = hashPassword(newPassword);
    if (verifyHash(getUser(email).hash, newPassword)) {
        return {kind: 'error', content: "That's already your password!"};
    } else {
        db.prepare("UPDATE people SET hash = ? WHERE email = ?;").run(hashedPassword, email);
        return {kind: 'success', content: 'Changed password successfully!'};
    }
}