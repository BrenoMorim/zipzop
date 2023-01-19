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
    const user = getUser(email);
    if (user == undefined) return undefined;
    return userDto(user);
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

export function addProfilePicture(email, picture) {
    db.prepare("UPDATE people SET profile_picture = ? WHERE email = ?;").run(picture, email);
}

export function removeProfilePicture(email) {
    if (getUser(email).profile_picture == null) {
        return {kind: 'error', content: "You don't have a profile picture!"};
    }
    db.prepare("UPDATE people SET profile_picture = null WHERE email = ?;").run(email);
    return {kind: 'success', content: "Profile picture was removed!"}
}
