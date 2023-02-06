import { getCookie } from "./cookies.js";
import showNotification from "./showNotification.js";

export default function checkIfLogged() {
    if (!getCookie('token_jwt')) {
        showNotification('error', 'User is not authenticated');
        alert("User is not authenticated");
        document.location.href = '/login';
    }
}