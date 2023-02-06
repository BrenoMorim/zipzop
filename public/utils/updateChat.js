import insertMessage from './insertMessage.js';

// Inserts incoming messages in chat
export default function updateChat(user, content) {
    if (document.querySelectorAll(".chat__message").length > 0 
        && document.querySelector("h1").textContent.includes(user.nickname)) {
        
        insertMessage(content, new Date().toISOString(), "received", user.nickname);
    }
}