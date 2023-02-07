import { countMessages, createNewChat, getChatByParticipants, getMessages, sendMessage } from "../db/chats.js";
import { getUserDto } from "../db/user.js";
import { verifyToken } from '../service/JWTService.js';

// Chat related events
export default function registerEventChat(socket, io) {
    socket.on("new_chat", (email) => {
        // Gets the email of the current user
        const thisEmail = verifyToken(socket.handshake.auth.token).email;
        const thisUser = getUserDto(thisEmail);
        // Validates the request
        if (thisEmail === email) {
            socket.emit("notification", {kind: "error", content: "Can't start a chat with yourself"});
        }
        else if (getUserDto(email) === undefined) {
            socket.emit("notification", {kind: "error", content: "There's no user with that email"});
        }
        else if (getChatByParticipants(thisEmail, email) !== undefined) {
            socket.emit("notification", {kind: "error", content: "There's already a chat between you two"});
        } else {
            // If no errors, creates new chat
            createNewChat(thisEmail, email);
            socket.to(email).emit("chat_started");
            socket.to(email).emit("notification", {kind: "success", content: `${thisUser.nickname} has started a chat with you!`});
            socket.emit("notification", {kind: "success", content: `New chat with ${email} was created`});
            socket.emit("new_chat_success");
        }
    });

    socket.on("load_header", () => {
        const email = verifyToken(socket.handshake.auth.token).email;
        socket.join(email);
        const user = getUserDto(email);
        socket.emit("header_loaded", user);
    })

    socket.on("load_chat", (token, otherEmail, size) => {
        // Loads the messages of a chat
        try {
            const email = verifyToken(token).email;
            socket.join(email);
            const user = getUserDto(email);
            const chat = getChatByParticipants(email, otherEmail);
            const messages = getMessages(chat.id, size);
            const total = countMessages(chat.id);
            const otherUser = getUserDto(otherEmail);
            socket.emit("chat_loaded", {user, chat, messages, otherUser, total});
        } catch(error) {
            socket.emit("chat_error");
        }
    });

    socket.on("send_message", (sender, receiver, content) => {
        // Sends message to user
        sendMessage(sender, receiver, content);
        const user = getUserDto(sender);
        socket.to(receiver).emit("receive_message", user, content);
    });
}