// Show notifications
export default function showNotification(kind, message) {
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
