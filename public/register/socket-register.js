import showNotification from "../utils/showNotification.js";
import { registerError, registerSuccess } from "./register.js";

const socket = io();

export function emitRegister(nickname, email, password) {
    socket.emit("register", nickname, email, password);
}

socket.on("register_error", (error) => {
    registerError(error.content);
});

socket.on("register_sucess", (token, user) => {
    registerSuccess(token, user.nickname);
});

socket.on("notification", (notification) => {
    showNotification(notification.kind, notification.content);
});
