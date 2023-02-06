import { chatpage } from "./chats/chatpage.js";
import { homepage } from "./homeNotLogged/homepage.js";
import loadHeader from "./utils/header.js";
import { getCookie } from "./utils/cookies.js";
import { hideLoader } from "./utils/loader.js";

// If the user is logged then display their chats
if (getCookie('token_jwt')) {
    document.querySelector("main.container").innerHTML = chatpage;
    import('./chats/chats.js');
    import('./chats/socket-chats.js');    
} else {
    // If not logged display the not logged home
    document.querySelector("main.container").innerHTML = homepage;
    loadHeader();
    hideLoader();
    document.querySelector("#login").addEventListener("click", () => location.href = "/login");
    document.querySelector("#register").addEventListener("click", () => location.href = "/register");
}
