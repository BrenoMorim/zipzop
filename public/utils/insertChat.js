import displayProfilePicture from "./displayProfilePicture.js";
import formatDate from "./formatDate.js";

export default function insertChat(chat, user) {
    const list = document.querySelector(".chats");
    const li = document.createElement("li");
    li.className = "chats__chat";

    // Finds the other participant
    const otherParticipant = user.email == chat.participant1 ? chat.participant2 : chat.participant1; 

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
    spanEmail.textContent = otherParticipant;
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

    // Adding the link to go to chat page
    li.addEventListener("click", () => location.href = `/chat?with=${otherParticipant}&size=12`);
    list.appendChild(li);
    document.querySelector("#no-chats-yet").classList.add("hidden");
}