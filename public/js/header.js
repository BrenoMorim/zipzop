import { loadPage } from "./index.js";
import loadProfile from "./profile.js";
import { emitLoadHomepage, emitLogout } from "./socket-index.js";

export default function loadHeader(user = {}) {

    if (user?.email != undefined) {

        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="nav">
                <p class="header__text">Welcome, ${user.nickname}</p>
                <button id="nav-chats" class="button">Chats</button>
                <button id="nav-profile" class="button">My profile</button>
                <button id="nav-logout" class="button">Log out</button>
            </nav>
        `;
        document.querySelector("#nav-chats").addEventListener("click", () => emitLoadHomepage(user.email));
        document.querySelector("#nav-profile").addEventListener("click", () => loadProfile(user));
        document.querySelector("#nav-logout").addEventListener("click", () => emitLogout(user.email));

    } else {

        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="nav">
                <button id="nav-index" class="button">Home</button>
                <button id="nav-login" class="button">Login</button>
                <button id="nav-register" class="button">Register</button>
            </nav>
        `;
        document.querySelector("#nav-index").addEventListener("click", () => loadPage("index"));
        document.querySelector("#nav-login").addEventListener("click", () => loadPage("login"));
        document.querySelector("#nav-register").addEventListener("click", () => loadPage("register"));

    }
}
