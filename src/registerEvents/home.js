import { getChatsByUser, getMessages } from "../db/chats.js";
import { getUserDto } from "../db/user.js";
import { verifyToken } from "../service/JWTService.js";

// Events related to the homepage
export default function registerEventHome(socket, io) {
    socket.on("load_chats", (token) => {
        // Gets the chats of the user to display in the homepage
        const email = verifyToken(token).email;
        socket.join(email);
        const user = getUserDto(email);
        const chats = getChatsByUser(email);
        chats.forEach(chat => {
            const lastMessage = getMessages(chat.id, 1);
            // Sends the last message info to the front-end
            if (lastMessage.length == 0) {
                chat.lastMessage = undefined;
            } else {
                chat.lastMessage = {
                    content: lastMessage.at(0).content,
                    sender: getUserDto(lastMessage.at(0).sender).nickname,
                    date: lastMessage.at(0).date
                };
            }
            // Gets data about the other participant
            const otherUserEmail = chat.participant1 === email ? chat.participant2 : chat.participant1;
            chat.otherUser = getUserDto(otherUserEmail);
        });
        socket.emit("chats_loaded", {user, chats});
    });
}
