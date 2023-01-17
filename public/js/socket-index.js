import { loadChatPage, loadHeader, loadHomepage, loadPage, loadProfile, showMessage, updateChat } from "./index.js";

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

socket.on("load-chat-page", ({user, messages, otherUser}) => {
    loadChatPage(user, messages, otherUser);
});

socket.on("load-profile", (user) => {
    loadProfile(user);
});

socket.on("receive-message", (user, content) => {
    if (document.querySelector("h1").textContent == `Chat with ${user.nickname}`) {
        updateChat(user, content);
    } else {
        showMessage("success", `${user.nickname} has sent you a message`);
    }
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

export function emitLoadChat(user, chat) {
    socket.emit("load-chat", user, chat);
}

export function emitLogout(email) {
    socket.emit("logout", email);
}

export function emitSendMessage(sender, receiver, content) {
    socket.emit("send-message", sender, receiver, content);
}

export function emitChangeNickname(user, newNickname) {
    socket.emit("change-nickname", user, newNickname);
}

export function emitChangePassword(user, newPassword) {
    socket.emit("change-password", user, newPassword);
}
