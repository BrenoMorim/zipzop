import showNotification  from "../utils/showNotification.js";
import { loginFail, loginSuccess } from "./login.js";

const socket = io();

export function emitLogin(email, password) {
    socket.emit("login", email, password);
}

socket.on("authentication_sucess", (token, user) => {
    loginSuccess(token, user.nickname);
});

socket.on("authentication_error", () => {
    loginFail();
});

socket.on("notification", (notification) => {
    showNotification(notification.kind, notification.content);
});
