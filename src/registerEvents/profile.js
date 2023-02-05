import { addProfilePicture, getUserDto, removeProfilePicture, updateUserNickname, updateUserPassword } from "../db/user.js";

// Events related to the profile page
export default function registerEventProfile(socket, io) {

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

}
