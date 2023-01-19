import { loadPage, showNotification, updateChat } from "./index.js";

import loadHeader from "./header.js";
import loadChatPage from "./chatpage.js";
import loadHomepage from "./homepage.js";
import loadProfile from "./profile.js";

const socket = io();

socket.on("loadpage", (page) => {
    loadPage(page);
});

socket.on("load-homepage", ({user, chats}) => {
    loadHomepage(user, chats);
});

socket.on("request-load-homepage", ({user}) => {
    emitLoadHomepage(user.email);
});

socket.on("loadheader", (user) => {
    loadHeader(user);
});

socket.on("notification", (notification) => {
    showNotification(notification.kind, notification.content);
});

socket.on("load-chat-page", ({user, chat, messages, otherUser, total}) => {
    loadChatPage(user, chat, messages, otherUser, total);
});

socket.on("load-profile", (user) => {
    loadProfile(user);
});

socket.on("receive-message", (user, content) => {
    if (document.querySelector("h1").textContent == `Chat with ${user.nickname}`) {
        updateChat(user, content);
    } else {
        showNotification("success", `${user.nickname} has sent you a message`);
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

export function emitLoadChat(user, chat, size) {
    socket.emit("load-chat", user, chat, size);
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

export function emitAddProfilePicture(user, picture) {
    socket.emit("add-profile-picture", user, picture);
}

export function emitRemoveProfilePicture(user) {
    socket.emit("remove-profile-picture", user);
}
