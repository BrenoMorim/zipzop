import loadHeader from "../utils/header.js";
import receiveMessage from "../utils/receiveMessage.js";
import showNotification from "../utils/showNotification.js";
import { getCookie } from "../utils/cookies.js";
import handleConnectionError from "../utils/handleConnectionError.js";

const socket = io("/users", {
    auth: {
        token: getCookie("token_jwt")
    }
});

handleConnectionError(socket);

socket.on("new_chat_success", () => {
    alert("Chat created successfully!");
    document.location.href = '/';
});

socket.on("header_loaded", (user) => {
    loadHeader(user);
})

socket.on("notification", (notification) => {
    showNotification(notification.kind, notification.content);
  });
  
socket.on("receive_message", (user, content) => {
    receiveMessage(user, content);
});

export function emitNewChat(email) {
    socket.emit("new_chat", email);
}

export function emitLoadHeader() {
    socket.emit("load_header");
}
