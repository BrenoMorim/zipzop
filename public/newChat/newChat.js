import { emitNewChat, emitLoadHeader } from "./socket-newChat.js";

emitLoadHeader();

const form = document.querySelector(".form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    emitNewChat(form.email.value);
});
