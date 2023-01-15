import { createUser, verifyLogin } from "./service/user.js";

export default function socketBackend(io) {
    
    io.on("connection", (socket) => {
        
        socket.emit("loadpage", "index");

        socket.on("login", (email, password) => {
            const success = verifyLogin(email, password);
            if (success) {
                socket.emit("login-success", email);
            } else {
                socket.emit("login-fail", email);
            }
        });
        
        socket.on("register", (nickname, email, password) => {
            const errorMessage = createUser(nickname, email, password);

            if (errorMessage) {
                socket.emit("error-message", errorMessage);
            }
        });

    });
}