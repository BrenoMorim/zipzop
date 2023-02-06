import { verifyToken } from "../service/JWTService.js";

export default function authenticateUser(socket, next) {

    const tokenJWT = socket.handshake.auth.token;
    try {
        console.log(tokenJWT);
        const payload = verifyToken(tokenJWT);
        socket.emit("authentication_sucess", payload);
        next();
    } catch(error) {
        next(new Error("User not logged"));
    }
}
