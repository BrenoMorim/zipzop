import { countMessages, createNewChat, getChatByParticipants, getMessages, sendMessage } from "../db/chats.js";
import { getUserDto } from "../db/user.js";

// Chat related events
export default function registerEventChat(socket, io) {
    socket.on("new-chat", (email) => {
        // Gets the email of the current user
        let thisEmail;
        socket.rooms.forEach(room => {
            if (room.includes("@")) {
                thisEmail = room;
            }
        });

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
            // If no errors, creates new chat and redirects to homepage
            createNewChat(thisEmail, email);
            socket.emit("notification", {kind: "success", content: `New chat with ${email} was created`});
            const user = getUserDto(thisEmail);
            socket.emit("request-load-homepage", {user});
        }
    });

    socket.on("load-chat", (user, chat, size) => {
        // Loads the messages of a chat and redirects to chatpage
        const messages = getMessages(chat.id, size);
        const total = countMessages(chat.id);
        const otherEmail = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
        const otherUser = getUserDto(otherEmail);
        socket.emit("load-chat-page", {user, chat, messages, otherUser, total});
    });

    socket.on("send-message", (sender, receiver, content) => {
        // Sends message to user
        sendMessage(sender, receiver, content);
        const user = getUserDto(sender);
        socket.to(receiver).emit("receive-message", user, content);
    });
}