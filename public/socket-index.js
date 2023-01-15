import { loadHeader, loadPage, showMessage } from "./index.js";

const socket = io();

socket.on("loadpage", (page) => {
    loadPage(page);
});

socket.on("loadheader", (isLogged) => {
    loadHeader(isLogged)
});

socket.on("message", (message) => {
    showMessage(message.kind, message.content);
});

export function emitLogin(email, password) {
    socket.emit("login", email, password);
}

export function emitRegister(nickname, email, password) {
    socket.emit("register", nickname, email, password);
}