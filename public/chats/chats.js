import loadHeader from "../utils/header.js";
import checkIfLogged from "../utils/checkIfLogged.js";
import displayProfilePicture from "../utils/displayProfilePicture.js";
import { hideLoader, showLoader } from "../utils/loader.js";
import insertChat from "../utils/insertChat.js";

checkIfLogged();
showLoader();
// Loads the homepage if logged
export default function loadChats(user, chats) {
    
    loadHeader(user);
    document.querySelector("#greet-user").textContent = `Welcome back, ${user.nickname}!`;
    document.querySelector("#start-chat").addEventListener("click", () => location.href = '/newChat');

    displayProfilePicture(user);

    document.querySelector("#no-chats-found").classList.add("hidden");

    // Error message if there are no chats
    if (chats.length > 0) {
        document.querySelector("#no-chats-yet").classList.add("hidden");
    } else {
        document.querySelector("#no-chats-yet").classList.remove("hidden");
    }

    // Clearing the chats
    document.querySelectorAll(".chats__chat").forEach(chatElement => {
        document.querySelector(".chats").removeChild(chatElement);
    })
    
    // Shows the chats of the user
    chats.forEach((chat) => {
        insertChat(chat, user);
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

    hideLoader();
}