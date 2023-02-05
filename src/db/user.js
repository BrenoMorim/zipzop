import db from "./db.js";
import { hashPassword, verifyHash } from "../service/authenticationService.js";
import userDto from "../service/userDto.js";

// Creates a new user
export function createUser(nickname, email, password) {
    const hash = hashPassword(password);

    // Checks if the email is already being used
    if (getUser(email) != undefined) {
        return `The email ${email} is already being used`;
    }

    db.prepare("INSERT INTO users (nickname, email, hash) VALUES (?, ?, ?);").run(nickname, email, hash);
    return "";   
}

// Gets all the information of the user
export function getUser(email) {
    return db.prepare("SELECT * FROM users WHERE email = ?;").get(email);
}

// Returns only the necessary data from each user
export function getUserDto(email) {
    const user = getUser(email);
    if (user == undefined) return undefined;
    return userDto(user);
}

// Login logic
export function verifyLogin(email, password) {
    
    const user = getUser(email);

    // If there isn't a user with the email
    if (user == undefined) return false;
    return verifyHash(user.hash, password);
}

// Updates nickname
export function updateUserNickname(email, newNickname) {
    db.prepare("UPDATE users SET nickname = ? WHERE email = ?;").run(newNickname, email);
}

// Update the password
export function updateUserPassword(email, newPassword) {
    const hashedPassword = hashPassword(newPassword);

    // Checks if the password is the same as the current one
    if (verifyHash(getUser(email).hash, newPassword)) {
        return {kind: 'error', content: "That's already your password!"};
    } else {
        db.prepare("UPDATE users SET hash = ? WHERE email = ?;").run(hashedPassword, email);
        return {kind: 'success', content: 'Changed password successfully!'};
    }
}

// Add a profile picture to the user
export function addProfilePicture(email, picture) {
    db.prepare("UPDATE users SET profile_picture = ? WHERE email = ?;").run(picture, email);
}

// Removes the profile picture by making it null
export function removeProfilePicture(email) {
    if (getUser(email).profile_picture == null) {
        return {kind: 'error', content: "You don't have a profile picture!"};
    }
    db.prepare("UPDATE users SET profile_picture = null WHERE email = ?;").run(email);
    return {kind: 'success', content: "Profile picture was removed!"}
}
