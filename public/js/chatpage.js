import { insertMessage } from "./index.js";
import { pages } from "./pages.js";
import { emitLoadChat, emitSendMessage } from "./socket-index.js";

export default function loadChatPage(user, chat, messages, otherUser, total) {
    document.querySelector("main").innerHTML = pages["chat"];
    document.querySelector(".chat__title").textContent = `Chat with ${otherUser.nickname}`;

    if (messages.length < total) {
        document.querySelector(".chat__load-more").style.display = "flex";
        document.querySelector("#load-more").addEventListener("click", () => {
            emitLoadChat(user, chat, messages.length + 12);
        });
    }

    messages.reverse().forEach(message => {
        if (message.sender === user.email) {
            insertMessage(message.content, message.date, "sent", user.nickname);
        } else {
            insertMessage(message.content, message.date, "received", otherUser.nickname);
        }

    });
    const form = document.querySelector("#send-message");
    form.addEventListener("click", (event) => {
        event.preventDefault();
        if (form.content.value.length == 0) return;
        insertMessage(form.content.value, new Date().toISOString(), "sent", user.nickname);
        emitSendMessage(user.email, otherUser.email, form.content.value);
        form.content.value = "";
    });
}