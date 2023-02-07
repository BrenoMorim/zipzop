import showNotification from "../utils/showNotification.js";
import receiveMessage from "../utils/receiveMessage.js";
import { getCookie } from "../utils/cookies.js";
import loadChats from "./chats.js";
import handleConnectionError from "../utils/handleConnectionError.js";

const socket = io("/users", {
  auth: {
    token: getCookie("token_jwt")
  }
});

handleConnectionError(socket);

socket.emit("load_chats", getCookie("token_jwt"));

socket.on("chats_loaded", ({user, chats}) => {
    loadChats(user, chats);
});

export function emitLoadChat(user, chat, size) {
    socket.emit("load_chat", user, chat, size);
}

socket.on("notification", (notification) => {
  showNotification(notification.kind, notification.content);
});

socket.on("receive_message", (user, content) => {
  receiveMessage(user, content);
  socket.emit("load_chats", getCookie("token_jwt"));
});

socket.on("chat_started", () => {
  socket.emit("load_chats", getCookie("token_jwt"));
});
