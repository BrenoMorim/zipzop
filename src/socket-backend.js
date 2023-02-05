import registerEventAuth from "./registerEvents/auth.js";
import registerEventChat from "./registerEvents/chat.js";
import registerEventHome from "./registerEvents/home.js";
import registerEventProfile from "./registerEvents/profile.js";

// Function to communicate with the front-end
export default function socketBackend(io) {
    
    io.on("connection", (socket) => {
        
        // Loads the homepage as the user is not logged yet
        socket.emit("loadpage", "index");
        socket.emit("loadheader");

        // Loads all the registered events
        registerEventAuth(socket, io);
        registerEventHome(socket, io);
        registerEventChat(socket, io);
        registerEventProfile(socket, io);
    });
}