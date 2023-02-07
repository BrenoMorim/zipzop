import { createUser, getUserDto, verifyLogin } from "../db/user.js";
import { createJwtToken } from "../service/JWTService.js";

// Events related to authentication
export default function registerEventAuth(socket, io) {

    socket.on("register", (nickname, email, password) => {
        const errorMessage = createUser(nickname, email, password);
        if (errorMessage) {
            socket.emit("register_error", {kind: "error", content: errorMessage});
        } else {
            // If the user was created, automatically login, sending the jwt token
            socket.join(email);
            const user = getUserDto(email);
            const token = createJwtToken({email: user.email});
            socket.emit("register_sucess", token, user);
        }
    });

    socket.on("login", (email, password) => {
        const success = verifyLogin(email, password);
        if (success) {
            // If login was done, emit success event
            const user = getUserDto(email);
            socket.join(email);
            const token = createJwtToken({email: user.email});
            socket.emit("authentication_sucess", token, user);
        } else {
            // If login wasn't done, show error message
            socket.emit("authentication_error");
        }
    });

}
