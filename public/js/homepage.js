import { displayProfilePicture, formatDate, loadPage } from "./index.js";
import { pages } from "./pages.js";
import { emitLoadChat } from "./socket-index.js";

export default function loadHomepage(user, chats) {

    document.querySelector("main").innerHTML = pages["homepage"];
    document.querySelector("#greet-user").textContent = `Welcome back, ${user.nickname}!`;
    document.querySelector("#start-chat").addEventListener("click", () => loadPage("new-chat"));

    displayProfilePicture(user);

    const list = document.querySelector(".chats");
    
    if (chats.length == 0) {
        list.innerHTML = '<li class="chats--empty">No chats yet</li>';
    }

    chats.forEach((chat) => {
        const li = document.createElement("li");
        li.className = "chats__chat";

        const img = document.createElement('img');
        img.src = "/assets/default-profile-picture.svg";
        img.width = 48;
        img.height = 48;
        img.className = "user__profile-picture";
        li.appendChild(img);
        displayProfilePicture(chat.otherUser, li);

        const spanEmail = document.createElement('span');
        spanEmail.className = "chats__chat__email";
        spanEmail.textContent = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
        li.appendChild(spanEmail);

        if (chat.lastMessage !== undefined) {

            const spanLastMessage = document.createElement('span');
            spanLastMessage.className = "chats__chat__last-message";
            spanLastMessage.textContent = `${chat.lastMessage.sender} > ${chat.lastMessage.content}`;
            li.appendChild(spanLastMessage);
            
            const spanLastUpdated = document.createElement('span');
            spanLastUpdated.className = "chats__chat__last-updated";
            spanLastUpdated.textContent = formatDate(chat.lastMessage.date);
            li.appendChild(spanLastUpdated);

        }

        li.addEventListener("click", () => emitLoadChat(user, chat, 12));
        list.appendChild(li);
    });

}