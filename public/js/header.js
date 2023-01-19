import { loadPage } from "./index.js";
import { emitLoadHomepage, emitLogout, emitLoadProfile } from "./socket-index.js";

export default function loadHeader(user = {}) {

    if (user?.email != undefined) {
        
        // Header if the user is logged
        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="header__logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="header__nav">
                <p class="header__text">Welcome, ${user.nickname}</p>
                <button id="nav-chats" class="button">Chats</button>
                <button id="nav-profile" class="button">My profile</button>
                <button id="nav-logout" class="button">Log out</button>
            </nav>
        `;
        // Enabling the links
        document.querySelector("#nav-chats").addEventListener("click", () => emitLoadHomepage(user.email));
        document.querySelector("#nav-profile").addEventListener("click", () => emitLoadProfile(user.email));
        document.querySelector("#nav-logout").addEventListener("click", () => emitLogout(user.email));

    } else {

        // Header if not logged yet
        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="header__logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="header__nav">
                <button id="nav-index" class="button">Home</button>
                <button id="nav-login" class="button">Login</button>
                <button id="nav-register" class="button">Register</button>
            </nav>
        `;

        // Enabling the links
        document.querySelector("#nav-index").addEventListener("click", () => loadPage("index"));
        document.querySelector("#nav-login").addEventListener("click", () => loadPage("login"));
        document.querySelector("#nav-register").addEventListener("click", () => loadPage("register"));

    }
}
