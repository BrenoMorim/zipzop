import { pages } from "./pages.js";
import { scripts } from "./scripts.js";
import "./socket-index.js";

export function loadPage(page) {
    document.querySelector("main").innerHTML = pages[page];
    scripts[page]();
}

export function loadHomepage(page, user, chats) {
    document.querySelector("main").innerHTML = pages[page];
    scripts[page]({user, chats});
}

export function loadHeader(user = {}) {
    if (user?.email != undefined) {
        scripts["header-logged"](user);
    } else {
        scripts["header"]();
    }
}

export function showMessage(kind, message) {
    const messageContainer = document.querySelector(".message-container");
    const messageSpan = document.querySelector(".message");

    messageContainer.style.display = "flex";

    messageContainer.classList.add(`message-container--${kind}`);
    messageSpan.classList.add(`message-container--${kind}`);
    messageSpan.textContent = message;
    setTimeout(() => {
        messageContainer.style.display = "none";
        messageContainer.classList.remove(`message-container--${kind}`);
        messageSpan.classList.remove(`message-container--${kind}`);
        messageSpan.textContent = "";
    }, 5000);
}

export function loadChatPage(user, messages, otherNickname) {
    document.querySelector("main").innerHTML = pages["chat"];
    scripts["chat"](user, messages, otherNickname);
}
