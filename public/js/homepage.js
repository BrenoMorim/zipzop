import { displayProfilePicture, formatDate, loadPage } from "./index.js";
import { pages } from "./pages.js";
import { emitLoadChat } from "./socket-frontend.js";

// Loads the homepage if logged
export default function loadHomepage(user, chats) {

    document.querySelector("main").innerHTML = pages["homepage"];
    document.querySelector("#greet-user").textContent = `Welcome back, ${user.nickname}!`;
    document.querySelector("#start-chat").addEventListener("click", () => loadPage("new-chat"));

    displayProfilePicture(user);

    const list = document.querySelector(".chats");
    document.querySelector("#no-chats-found").classList.add("hidden");

    // Error message if there are no chats
    if (chats.length > 0) {
        document.querySelector("#no-chats-yet").classList.add("hidden");
    } else {
        document.querySelector("#no-chats-yet").classList.remove("hidden");
    }

    // Shows the chats of the user
    chats.forEach((chat) => {
        const li = document.createElement("li");
        li.className = "chats__chat";

        // Sets the profile picture of the other participant
        const img = document.createElement('img');
        img.src = "/assets/default-profile-picture.svg";
        img.width = 48;
        img.height = 48;
        img.className = "user__profile-picture";
        li.appendChild(img);
        displayProfilePicture(chat.otherUser, li);

        // Show the other participant email
        const spanEmail = document.createElement('span');
        spanEmail.className = "chats__chat__email";
        spanEmail.textContent = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
        li.appendChild(spanEmail);

        // Shows info about the last message of the chat
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

    const queryChat = document.querySelector("#query-chat");

    // Query chat is disabled if there are no chats
    if (!document.querySelector("#no-chats-yet").classList.contains("hidden")) {
        queryChat.classList.add("hidden");
    } else {
        queryChat.classList.remove("hidden");
    }

    // Hides the chats that don't match the query
    queryChat.addEventListener("keyup", (event) => {
        let count = 0;
        document.querySelectorAll(".chats__chat").forEach(chat => {
            console.log(chat);
            if (chat.querySelector(".chats__chat__email").textContent.includes(event.target.value)) {
                chat.classList.remove("hidden");
                count += 1;
            } else {
                chat.classList.add("hidden");
            }
        });

        // Error message if any chats match the query
        if (queryChat.value !== '' && count === 0) {
            document.querySelector("#no-chats-found").classList.remove("hidden");
        } else {
            document.querySelector("#no-chats-found").classList.add("hidden");
        }
    });
}