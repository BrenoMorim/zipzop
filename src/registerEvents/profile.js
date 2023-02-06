import { addProfilePicture, getUserDto, removeProfilePicture, updateUserNickname, updateUserPassword } from "../db/user.js";
import { verifyToken } from  "../service/JWTService.js";

// Events related to the profile page
export default function registerEventProfile(socket, io) {

    socket.on("load_profile", () => {
        const email = verifyToken(socket.handshake.auth.token).email;
        socket.join(email);
        // Redirects to load-profile event, where all the data will be loaded
        socket.emit("profile_loaded", getUserDto(email));
    });

    socket.on("change_nickname", (user, newNickname) => {
        // Updates the user nickname
        updateUserNickname(user.email, newNickname);
        socket.emit("notification", {kind: "success", content: "Nickname updated successfully!"});
        socket.emit("profile_loaded", getUserDto(user.email));
    });

    socket.on("change_password", (user, newPassword) => {
        // Changes the user password
        const message = updateUserPassword(user.email, newPassword);
        socket.emit("notification", message);
        socket.emit("profile_loaded", user);
    });

    socket.on("add_profile_picture", (user, picture) => {
        // Checks if a picture was provided
        if (picture === null) {
            socket.emit("notification", {kind: "error", content: "No picture was provided!"});    
        } else {
            // Adds profile picture
            addProfilePicture(user.email, picture);
            socket.emit("notification", {kind: "success", content: "Profile picture added!"});
            socket.emit("profile_loaded", getUserDto(user.email));
        }
    });

    socket.on("remove_profile_picture", (user) => {
        // Removes profile picture from user
        const message = removeProfilePicture(user.email);
        socket.emit("notification", message);
        socket.emit("profile_loaded", getUserDto(user.email));
    });
}
