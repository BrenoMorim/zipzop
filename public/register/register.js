import loadHeader from "../utils/header.js";
import showNotification from "../utils/showNotification.js";
import { setCookie } from "../utils/cookies.js";
import { emitRegister } from "./socket-register.js";

loadHeader();

const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Form validation
    if (form.nickname.value.length < 3) {
        showNotification("error", "Nickname should have at least three characters!");
        return;
    }

    if (form.password.value.length < 7) {
        showNotification("error", "Password should be at least 7 characters long!");
        return;
    }

    if (form.password.value !== form.passwordConfirmation.value) {
        showNotification("error", "Passwords aren't matching!");
        return;
    }

    emitRegister(form.nickname.value, form.email.value, form.password.value);
});

export function registerSuccess(token, nickname) {
    setCookie("token_jwt", token);
    alert("Register completed successfully!");
    showNotification('success', `User ${nickname} registered successfully!`);
    document.location.href = '/';
}

export function registerError(errorMessage) {
    showNotification('error', errorMessage);
}
