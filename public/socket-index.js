import { loadHeader, loadHomepage, loadPage, showMessage } from "./index.js";

const socket = io();

socket.on("loadpage", (page) => {
    loadPage(page);
});

socket.on("load-homepage", ({user, chats}) => {
    loadHomepage("homepage", user, chats);
});

socket.on("loadheader", (user) => {
    loadHeader(user);
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

export function emitNewChat(email) {
    socket.emit("new-chat", email);
}

export function emitLoadHomepage(email) {
    socket.emit("load-homepage-with-data", email);
}