import { pages } from "./pages.js";
import { scripts } from "./scripts.js";
import "./socket-index.js";

// Loads simpler pages
export function loadPage(page) {
    document.querySelector("main").innerHTML = pages[page];
    scripts[page]();
}

// Show notifications
export function showNotification(kind, message) {
    const notification = document.querySelector(".notification");
    const messageSpan = document.querySelector(".notification__message");

    // Makes it visible
    notification.style.display = "flex";

    notification.classList.add(`notification--${kind}`);
    messageSpan.textContent = message;
    
    // Hides the notification after some time
    setTimeout(() => {
        notification.style.display = "none";
        notification.classList.remove(`notification--${kind}`);
        messageSpan.textContent = "";
    }, 3500);
}

// Formats date object to US pattern
export function formatDate(date) {
    const parsedDate = new Date(date);
    const hours = parsedDate.getHours() >= 10 ? parsedDate.getHours() : `0${parsedDate.getHours()}`;
    const minutes = parsedDate.getMinutes() >= 10 ? parsedDate.getMinutes() : `0${parsedDate.getMinutes()}`;
    const month = parsedDate.getMonth() + 1 >= 10 ? parsedDate.getMonth() + 1 : `0${parsedDate.getMonth() + 1}`;
    const day = parsedDate.getDate() >= 10 ? parsedDate.getDate() : `0${parsedDate.getDate()}`;
    return `${hours}:${minutes} ${month}/${day}/${parsedDate.getFullYear()}`;
}

// Inserts message in chat
export function insertMessage(content, date, type, author) {
    const li = document.createElement("li");
    
    li.innerHTML = `<p class="chat__message__info">
        <span class="chat__message__author"></span> 
        <span class="chat__message__content"></span>
        </p>
        <p class="chat__message__time">${formatDate(date)}</p>
    `;

    // Grants protection against XSS using textContent instead of innerHTML
    li.querySelector(".chat__message__author").textContent = `${author} >`;
    li.querySelector(".chat__message__content").textContent = content;
    li.classList.add("chat__message");
    li.classList.add(`chat__message--${type}`);

    document.querySelector(".chat").appendChild(li);
    document.querySelector(".chat__message--empty").style.display = 'none';
}

// Inserts incoming messages in chat
export function updateChat(user, content) {
    if (document.querySelectorAll(".chat__message").length > 0 
        && document.querySelector("h1").textContent.includes(user.nickname)) {
        
        insertMessage(content, new Date().toISOString(), "received", user.nickname);
    }
}

// If the user has a profile picture, then display it instead of the default one
export function displayProfilePicture(user, root=document) {
    if (user.profile_picture !== null) {
            root.querySelector(".user__profile-picture")
                .setAttribute("src", `data:image/png;base64, ${user.profile_picture}`);
    }
}
