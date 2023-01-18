import { loadPage, showNotification } from "./index.js";
import { emitLogin, emitNewChat, emitRegister } from "./socket-index.js";

export const scripts = {
    "login": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            emitLogin(form.email.value, form.password.value);
        });
    },
    "index": () => {
        document.querySelector("#login").addEventListener("click", () => loadPage("login"));
        document.querySelector("#register").addEventListener("click", () => loadPage("register"));
    },
    "register": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

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
    },
    "new-chat": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            emitNewChat(form.email.value);
        });
    }
};