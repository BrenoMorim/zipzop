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
    messageSpan.textContent = message;
    setTimeout(() => {
        messageContainer.style.display = "none";
        messageContainer.classList.remove(`message-container--${kind}`);
        messageSpan.textContent = "";
    }, 5000);
}

export function loadChatPage(user, messages, otherNickname) {
    document.querySelector("main").innerHTML = pages["chat"];
    scripts["chat"](user, messages, otherNickname);
}

export function loadProfile(user) {
    document.querySelector("main").innerHTML = pages["profile"];
    scripts["profile"](user);
}

export function insertMessage(content, date, type, author) {
    const li = document.createElement("li");
    const parsedDate = new Date(date);
    const hours = parsedDate.getHours() >= 10 ? parsedDate.getHours() : `0${parsedDate.getHours()}`;
    const minutes = parsedDate.getMinutes() >= 10 ? parsedDate.getMinutes() : `0${parsedDate.getMinutes()}`;
    const month = parsedDate.getMonth() + 1 >= 10 ? parsedDate.getMonth() + 1 : `0${parsedDate.getMonth() + 1}`;
    const day = parsedDate.getDate() >= 10 ? parsedDate.getDate() : `0${parsedDate.getDate()}`;
    
    li.innerHTML = `<p class="message-info">
        <span class="message-author">${author} ></span>
        <span class="message-text-content"> ${content}</span>
        </p>
        <span class="message-time">${hours}:${minutes} ${month}/${day}/${parsedDate.getFullYear()}</span>
    `;
    li.classList.add("chat-message");
    li.classList.add(`chat-message--${type}`);

    document.querySelector(".chat-messages").appendChild(li);
}

export function updateChat(user, content) {
    if (document.querySelectorAll(".chat-messages").length > 0 
        && document.querySelector("h1").textContent.includes(user.nickname)) {
        
        insertMessage(content, new Date().toISOString(), "received", user.nickname);
    }
}
