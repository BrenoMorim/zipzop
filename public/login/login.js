import { emitLogin } from "./socket-login.js";
import loadHeader from "../utils/header.js";
import { setCookie } from "../utils/cookies.js";
import showNotification  from "../utils/showNotification.js";
 
loadHeader();
const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    emitLogin(form.email.value, form.password.value);
});

export function loginSuccess(token, nickname) {
    setCookie("token_jwt", token);
    showNotification('success', `Logged in as ${nickname}`);
    document.location.href = '/';
}

export function loginFail() {
    showNotification('error', 'Failed to login, please check your email and password');
}
