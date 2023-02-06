import showNotification from "./showNotification.js";
import updateChat from "./updateChat.js";

export default function receiveMessage(user, content) {
    if (document.querySelector("h1").textContent == `Chat with ${user.nickname}`) {
        // If the user is in the chatpage, insert new message to the chatpage
        updateChat(user, content);
    } else {
        // Else show notification that a message was delivered to the user
        showNotification("success", `${user.nickname} has sent you a message`);
    }
}