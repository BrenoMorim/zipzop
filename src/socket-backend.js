import { createNewChat, getChatByParticipants, getChatsByUser } from "./service/chats.js";
import { createUser, getUser, verifyLogin } from "./service/user.js";

export default function socketBackend(io) {
    
    io.on("connection", (socket) => {
        
        socket.emit("loadpage", "index");
        socket.emit("loadheader");

        socket.on("login", (email, password) => {
            const success = verifyLogin(email, password);
            if (success) {
                const user = getUser(email);
                socket.emit("loadheader", user);
                socket.emit("message", {kind: "success", content: `Logged in as '${user.nickname}' successfully!`});
                socket.join(email);
                const chats = getChatsByUser(email);
                socket.emit("load-homepage", {user, chats});
            } else {
                socket.emit("message", {kind: "error", content: "Failed to login, please check your email and password"});
            }
        });

        socket.on("load-homepage-with-data", (email) => {
            const user = getUser(email);
            const chats = getChatsByUser(email);
            socket.emit("load-homepage", {user, chats});
        })
        
        socket.on("register", (nickname, email, password) => {
            const errorMessage = createUser(nickname, email, password);
            if (errorMessage) {
                socket.emit("message", {kind: "error", content: errorMessage});
            } else {
                socket.emit("loadheader", getUser(email));
                socket.emit("message", {kind: "success", content: `User '${nickname}' registered successfully`});
                socket.join(email);
                const user = getUser(email);
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
            })
            
            if (thisEmail === email) {
                socket.emit("message", {kind: "error", content: "Can't start a chat with yourself"});
            }
            else if (getUser(email) === undefined) {
                socket.emit("message", {kind: "error", content: "There's no user with that email"});
            }
            else if (getChatByParticipants(thisEmail, email) !== undefined) {
                socket.emit("message", {kind: "error", content: "There's already a chat between you two"});
            } else {
                createNewChat(thisEmail, email);
                socket.emit("message", {kind: "success", content: `New chat with ${email} was created`});
                const user = getUser(email);
                const chats = getChatsByUser(email);
                socket.emit("load-homepage", {user, chats});
            }
        });
    });
}