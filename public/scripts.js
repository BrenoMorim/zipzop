import { loadPage } from "./index.js";
import { emitLoadHomepage, emitLogin, emitNewChat, emitRegister } from "./socket-index.js";

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
            emitRegister(form.nickname.value, form.email.value, form.password.value);
        });
    },
    "homepage": ({user, chats}) => {
        document.querySelector("#greet-user").textContent = `Welcome, ${user.nickname}`;
        document.querySelector("#start-chat").addEventListener("click", () => loadPage("new-chat"));
        const list = document.querySelector(".chats");
        if (chats == undefined) {
            list.innerHTML = "<li>No chats yet</li>";
        } else {
            chats.forEach((chat) => {
                const li = document.createElement("li");
                li.textContent = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
                list.appendChild(li);
            });
        }
    },
    "new-chat": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            emitNewChat(form.email.value);
        });
    },
    "header": () => {
        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="nav">
                <button id="nav-login" class="btn btn-info">Login</button>
                <button id="nav-register" class="btn btn-info">Register</button>
            </nav>
        `;
        document.querySelector("#nav-login").addEventListener("click", () => loadPage("login"));
        document.querySelector("#nav-register").addEventListener("click", () => loadPage("register"));
    },
    "header-logged": (user) => {
        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="nav">
                <p class="header__text">Welcome, ${user.nickname}</p>
                <button id="nav-chats" class="btn btn-info">Chats</button>
                <button id="nav-profile" class="btn btn-info">My profile</button>
                <button id="nav-logout" class="btn btn-info">Log out</button>
            </nav>
        `;
        document.querySelector("#nav-chats").addEventListener("click", () => emitLoadHomepage(user.email));
        document.querySelector("#nav-profile").addEventListener("click", () => loadPage("profile"));
        document.querySelector("#nav-logout").addEventListener("click", () => {});
    }
};