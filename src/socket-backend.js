import { countMessages, createNewChat, getChatByParticipants, getChatsByUser, getMessages, sendMessage } from "./service/chats.js";
import { addProfilePicture, createUser, getUserDto, removeProfilePicture, updateUserNickname, updateUserPassword, verifyLogin } from "./service/user.js";

// Function to communicate with the front-end
export default function socketBackend(io) {
    
    io.on("connection", (socket) => {
        
        // Loads the homepage as the user is not logged yet
        socket.emit("loadpage", "index");
        socket.emit("loadheader");

        socket.on("login", (email, password) => {
            const success = verifyLogin(email, password);
            if (success) {
                // If login was done, redirects to logged homepage
                const user = getUserDto(email);
                socket.emit("loadheader", user);
                socket.emit("notification", {kind: "success", content: `Logged in as '${user.nickname}'!`});
                socket.join(email);
                socket.emit("request-load-homepage", {user});
            } else {
                // If login wasn't done, show error message
                socket.emit("notification", {kind: "error", content: "Failed to login, please check your email and password"});
            }
        });

        socket.on("load-homepage-with-data", (email) => {
            // Gets the chats of the user to display in the homepage
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
            socket.emit("load-homepage", {user, chats});
        })
        
        socket.on("register", (nickname, email, password) => {
            const errorMessage = createUser(nickname, email, password);
            if (errorMessage) {
                socket.emit("notification", {kind: "error", content: errorMessage});
            } else {
                // If the user was created, automatically login and redirect to homepage
                socket.emit("loadheader", getUserDto(email));
                socket.emit("notification", {kind: "success", content: `User '${nickname}' registered successfully`});
                socket.join(email);
                const user = getUserDto(email);
                socket.emit("request-load-homepage", {user});
            }
        });

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

        socket.on("logout", (email) => {
            // Logout logic, redirect to not logged homepage
            socket.leave(email);
            socket.emit("loadpage", "index");
            socket.emit("loadheader");
            socket.emit("notification", {kind: "success", content: "Logged out successfully!"});
        });

        socket.on("send-message", (sender, receiver, content) => {
            // Sends message to user
            sendMessage(sender, receiver, content);
            const user = getUserDto(sender);
            socket.to(receiver).emit("receive-message", user, content);
        });

        socket.on("load-profile-with-data", (email) => {
            // Redirects to load-profile event, where all the data will be loaded
            socket.emit("load-profile", getUserDto(email));
        });

        socket.on("change-nickname", (user, newNickname) => {
            // Updates the user nickname
            updateUserNickname(user.email, newNickname);
            socket.emit("notification", {kind: "success", content: "Nickname updated successfully!"});
            socket.emit("load-profile", getUserDto(user.email));
        });

        socket.on("change-password", (user, newPassword) => {
            // Changes the user password
            const message = updateUserPassword(user.email, newPassword);
            socket.emit("notification", message);
            socket.emit("load-profile", user);
        });

        socket.on("add-profile-picture", (user, picture) => {
            // Checks if a picture was provided
            if (picture === null) {
                socket.emit("notification", {kind: "error", content: "No picture was provided!"});    
            } else {
                // Adds profile picture
                addProfilePicture(user.email, picture);
                socket.emit("notification", {kind: "success", content: "Profile picture added!"});
                socket.emit("load-profile", getUserDto(user.email));
            }
        });

        socket.on("remove-profile-picture", (user) => {
            // Removes profile picture from user
            const message = removeProfilePicture(user.email);
            socket.emit("notification", message);
            socket.emit("load-profile", getUserDto(user.email));
        });
    });
}