import { createUser, verifyLogin } from "./service/user.js";

export default function socketBackend(io) {
    
    io.on("connection", (socket) => {
        
        socket.emit("loadpage", "index");
        socket.emit("loadheader", false);

        socket.on("login", (email, password) => {
            const success = verifyLogin(email, password);
            if (success) {
                socket.emit("loadheader", true);
                socket.emit("message", "success", "Logged in successfully");
                socket.join(email);
            } else {
                // TODO
                socket.emit("message", "error", "Failed to login, please check your email and password");
            }
        });
        
        socket.on("register", (nickname, email, password) => {
            const errorMessage = createUser(nickname, email, password);
            if (errorMessage) {
                socket.emit("message", "error", errorMessage);
            } else {
                socket.emit("loadheader", true)
                socket.join(email);
                socket.emit("message", "success", "Registered successfully");
            }
        });

    });
}