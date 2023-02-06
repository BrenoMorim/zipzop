import displayProfilePicture from  "../utils/displayProfilePicture.js";
import showNotification from "../utils/showNotification.js";
import loadHeader from "../utils/header.js";
import { emitAddProfilePicture, emitChangeNickname, emitChangePassword, emitRemoveProfilePicture } from "./socket-profile.js";

// Loads the profile page
export default function loadProfile(user) {

    // Shows the user info
    loadHeader(user);
    document.querySelector(".profile__title").textContent = `${user.nickname}'s profile`;
    document.querySelector(".profile__email").textContent = `Email: ${user.email}`;
    document.querySelector("#current-nickname").textContent = `Current nickname: ${user.nickname}`;
    displayProfilePicture(user);

    // Change nickname form
    const formNickname = document.querySelector("#change-nickname");
    formNickname.addEventListener("submit", (event) => {
        event.preventDefault();
        if (formNickname.nickname.value === user.nickname) {
            showNotification("error", "That's already your nickname")
            return;
        }

        if (formNickname.nickname.value.length < 3) {
            showNotification("error", "Nickname should have at least three characters");
            return;
        }
    
        emitChangeNickname(user, formNickname.nickname.value);
        formNickname.nickname.value = "";
    });

    // Change password form
    const formPassword = document.querySelector("#change-password");
    formPassword.addEventListener("submit", (event) => {
        event.preventDefault();

        if (formPassword.newPassword.value.length < 7) {
            showNotification("error", "Password should be at least 7 characters long");
            return;
        }

        if (formPassword.newPassword.value !== formPassword.confirmNewPassword.value) {
            showNotification("error", "Passwords aren't matching");
            return;
        }

        emitChangePassword(user, formPassword.newPassword.value);
    });

    // Form to add profile pictures
    const formProfilePicture = document.querySelector("#add-profile-picture");
    formProfilePicture.addEventListener("submit", (event) => {
        event.preventDefault();
        const picture = document.querySelector("#profile-picture").files[0];
        emitAddProfilePicture(user, picture);
    });

    // Button that removes the user profile picture
    document.querySelector("#remove-profile-picture").addEventListener("click", () => {
        emitRemoveProfilePicture(user);
    });
}