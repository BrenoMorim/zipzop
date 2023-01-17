import { loadPage } from "./index.js";
import { pages } from "./pages.js";
import { emitLoadChat } from "./socket-index.js";

export default function loadHomepage(user, chats) {

    document.querySelector("main").innerHTML = pages["homepage"];
    document.querySelector("#greet-user").textContent = `Welcome back, ${user.nickname}!`;
    document.querySelector("#start-chat").addEventListener("click", () => loadPage("new-chat"));

    const list = document.querySelector(".chats");
    
    chats.forEach((chat) => {
        const li = document.createElement("li");
        li.classList.add("chat");
        li.textContent = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
        li.addEventListener("click", () => emitLoadChat(user, chat, 12));
        list.appendChild(li);
    });

}