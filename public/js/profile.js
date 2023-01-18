import { showNotification } from "./index.js";
import { pages } from "./pages.js";
import { emitChangeNickname, emitChangePassword } from "./socket-index.js";

export default function loadProfile(user) {

    document.querySelector("main").innerHTML = pages["profile"];
    document.querySelector(".profile__title").textContent = `${user.nickname}'s profile`;
    document.querySelector(".profile__email").textContent = `Email: ${user.email}`;
    document.querySelector("#current-nickname").textContent = `Current nickname: ${user.nickname}`;

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
}