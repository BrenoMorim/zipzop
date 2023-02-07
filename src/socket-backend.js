import authenticateUser from "./middlewares/authenticateUser.js";
import registerEventAuth from "./registerEvents/auth.js";
import registerEventChat from "./registerEvents/chat.js";
import registerEventHome from "./registerEvents/home.js";
import registerEventProfile from "./registerEvents/profile.js";

// Function to communicate with the front-end
export default function socketBackend(io) {

    const nspUsers = io.of("/users");
    // Using the authentication middleware
    nspUsers.use((socket, next) => authenticateUser(socket, next));

    nspUsers.on("connection", (socket) => {

        // Loads events restricted to logged users
        registerEventHome(socket, io);
        registerEventChat(socket, io);
        registerEventProfile(socket, io);
    });

    io.on("connection", (socket) => {

        // Loads all the auth events, available to all users
        registerEventAuth(socket, io);
    });
}