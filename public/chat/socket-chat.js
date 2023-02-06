import receiveMessage from "../utils/receiveMessage.js";
import showNotification from "../utils/showNotification.js";
import { getCookie } from "../utils/cookies.js";
import { loadChatPage } from "./chat.js";
import handleConnectionError from "../utils/handleConnectionError.js";

const socket = io("/users", {
    auth: {
        token: getCookie("token_jwt")
    }
});

handleConnectionError(socket);

// Getting the url parameters
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

emitLoadChat(getCookie("token_jwt"), params.with, params.size);

export function emitSendMessage(sender, receiver, content) {
    socket.emit("send_message", sender, receiver, content);
}

export function emitLoadChat(token, otherUser, size) {
    socket.emit("load_chat", token, otherUser, size);
}

// Update the page
socket.on("chat_loaded", ({user, chat, messages, otherUser, total}) => {
    loadChatPage(user, chat, messages, otherUser, total);
});

socket.on("notification", (notification) => {
    showNotification(notification.kind, notification.content);
  });
  
socket.on("receive_message", (user, content) => {
    receiveMessage(user, content);
});

socket.on("chat_error", () => {
    showNotification('error', 'Unable to load the chat');
});
