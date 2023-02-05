import { createUser, getUserDto, verifyLogin } from "../db/user.js";

// Events related to authentication
export default function registerEventAuth(socket, io) {

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

    socket.on("logout", (email) => {
        // Logout logic, redirect to not logged homepage
        socket.leave(email);
        socket.emit("loadpage", "index");
        socket.emit("loadheader");
        socket.emit("notification", {kind: "success", content: "Logged out successfully!"});
    });
    
}
