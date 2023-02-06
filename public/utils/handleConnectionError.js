import showNotification from "./showNotification.js";

export default function handleConnectionError(socket) {
    socket.on("connect_error", () => {
        showNotification('error', 'User is not authenticated!');
        alert("User is not authenticated");
        document.location.href = '/login';
    });
}