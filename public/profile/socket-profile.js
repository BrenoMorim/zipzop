import showNotification from "../utils/showNotification.js";
import receiveMessage from "../utils/receiveMessage.js";
import { getCookie } from "../utils/cookies.js";
import loadProfile from "./profile.js";
import handleConnectionError from "../utils/handleConnectionError.js";

const socket = io("/users", {
    auth: {
        token: getCookie("token_jwt")
    }
});

handleConnectionError(socket);

socket.emit("load_profile");

socket.on("profile_loaded", (user) => {
    loadProfile(user);
});

socket.on("notification", (notification) => {
    showNotification(notification.kind, notification.content);
});
  
socket.on("receive_message", (user, content) => {
    receiveMessage(user, content);
});

export function emitChangeNickname(user, newNickname) {
    socket.emit("change_nickname", user, newNickname);
}

export function emitChangePassword(user, newPassword) {
    socket.emit("change_password", user, newPassword);
}

export function emitAddProfilePicture(user, picture) {
    socket.emit("add_profile_picture", user, picture);
}

export function emitRemoveProfilePicture(user) {
    socket.emit("remove_profile_picture", user);
}