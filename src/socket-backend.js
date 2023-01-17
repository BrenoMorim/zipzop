import { countMessages, createNewChat, getChatByParticipants, getChatsByUser, getMessages, sendMessage } from "./service/chats.js";
import { createUser, getUserDto, updateUserNickname, updateUserPassword, verifyLogin } from "./service/user.js";

export default function socketBackend(io) {
    
    io.on("connection", (socket) => {
        
        socket.emit("loadpage", "index");
        socket.emit("loadheader");

        socket.on("login", (email, password) => {
            const success = verifyLogin(email, password);
            if (success) {
                const user = getUserDto(email);
                socket.emit("loadheader", user);
                socket.emit("message", {kind: "success", content: `Logged in as '${user.nickname}'!`});
                socket.join(email);
                const chats = getChatsByUser(email);
                socket.emit("load-homepage", {user, chats});
            } else {
                socket.emit("message", {kind: "error", content: "Failed to login, please check your email and password"});
            }
        });

        socket.on("load-homepage-with-data", (email) => {
            const user = getUserDto(email);
            const chats = getChatsByUser(email);
            socket.emit("load-homepage", {user, chats});
        })
        
        socket.on("register", (nickname, email, password) => {
            const errorMessage = createUser(nickname, email, password);
            if (errorMessage) {
                socket.emit("message", {kind: "error", content: errorMessage});
            } else {
                socket.emit("loadheader", getUserDto(email));
                socket.emit("message", {kind: "success", content: `User '${nickname}' registered successfully`});
                socket.join(email);
                const user = getUserDto(email);
                const chats = getChatsByUser(email);
                socket.emit("load-homepage", {user, chats});
            }
        });

        socket.on("new-chat", (email) => {
            let thisEmail;

            socket.rooms.forEach(room => {
                if (room.includes("@")) {
                    thisEmail = room;
                }
            });
            if (thisEmail === email) {
                socket.emit("message", {kind: "error", content: "Can't start a chat with yourself"});
            }
            else if (getUserDto(email) === undefined) {
                socket.emit("message", {kind: "error", content: "There's no user with that email"});
            }
            else if (getChatByParticipants(thisEmail, email) !== undefined) {
                socket.emit("message", {kind: "error", content: "There's already a chat between you two"});
            } else {
                createNewChat(thisEmail, email);
                socket.emit("message", {kind: "success", content: `New chat with ${email} was created`});
                const user = getUserDto(email);
                const chats = getChatsByUser(email);
                socket.emit("load-homepage", {user, chats});
            }
        });

        socket.on("load-chat", (user, chat, size) => {
            const messages = getMessages(chat.id, size);
            const total = countMessages(chat.id);
            const otherEmail = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
            const otherUser = getUserDto(otherEmail);
            socket.emit("load-chat-page", {user, chat, messages, otherUser, total});
        });

        socket.on("logout", (email) => {
            socket.leave(email);
            socket.emit("loadpage", "index");
            socket.emit("loadheader");
            socket.emit("message", {kind: "success", content: "Logged out successfully!"});
        });

        socket.on("send-message", (sender, receiver, content) => {
            sendMessage(sender, receiver, content);
            const user = getUserDto(sender);
            socket.to(receiver).emit("receive-message", user, content);
        });

        socket.on("change-nickname", (user, newNickname) => {
            updateUserNickname(user.email, newNickname);
            socket.emit("message", {kind: "success", content: "Nickname updated successfully!"});
            socket.emit("load-profile", getUserDto(user.email));
        });

        socket.on("change-password", (user, newPassword) => {
            const message = updateUserPassword(user.email, newPassword);
            socket.emit("message", message);
            socket.emit("load-profile", user);
        });
    });
}