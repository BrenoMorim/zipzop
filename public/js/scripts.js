import { insertMessage, loadPage, loadProfile, showMessage } from "./index.js";
import { emitChangeNickname, emitChangePassword, emitLoadChat, emitLoadHomepage, emitLogin, emitLogout, emitNewChat, emitRegister, emitSendMessage } from "./socket-index.js";

export const scripts = {
    "login": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            emitLogin(form.email.value, form.password.value);
        });
    },
    "index": () => {
        document.querySelector("#login").addEventListener("click", () => loadPage("login"));
        document.querySelector("#register").addEventListener("click", () => loadPage("register"));
    },
    "register": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();

            if (form.nickname.value.length < 3) {
                showMessage("error", "Nickname should have at least three characters!");
                return;
            }

            if (form.password.value.length < 7) {
                showMessage("error", "Password should be at least 7 characters long!");
                return;
            }

            if (form.password.value !== form.passwordConfirmation.value) {
                showMessage("error", "Passwords aren't matching!");
                return;
            }

            emitRegister(form.nickname.value, form.email.value, form.password.value);
        });
    },
    "homepage": ({user, chats}) => {
        document.querySelector("#greet-user").textContent = `Welcome back, ${user.nickname}!`;
        document.querySelector("#start-chat").addEventListener("click", () => loadPage("new-chat"));
        const list = document.querySelector(".chats");
        if (chats == undefined) {
            list.innerHTML = "<li>No chats yet</li>";
        } else {
            chats.forEach((chat) => {
                const li = document.createElement("li");
                li.classList.add("chat");
                li.textContent = user.email == chat.participant1 ? chat.participant2 : chat.participant1;
                li.addEventListener("click", () => emitLoadChat(user, chat));
                list.appendChild(li);
            });
        }
    },
    "new-chat": () => {
        const form = document.querySelector(".form");
        form.addEventListener("submit", (event) => {
            event.preventDefault();
            emitNewChat(form.email.value);
        });
    },
    "chat": (user, messages, otherUser) => {
        document.querySelector(".chat-title").textContent = `Chat with ${otherUser.nickname}`;
        const list = document.querySelector(".chat-messages");
        if (messages == undefined) {
            list.innerHTML = "<li>No messages yet</li>";
        } else {
            messages.forEach(message => {
                if (message.sender === user.email) {
                    insertMessage(message.content, message.date, "sent", user.nickname);
                } else {
                    insertMessage(message.content, message.date, "received", otherUser.nickname);
                }
            });
        }
        const form = document.querySelector("#send-message");
        form.addEventListener("click", (event) => {
            event.preventDefault();
            if (form.content.value.length == 0) return;
            insertMessage(form.content.value, new Date().toISOString(), "sent", user.nickname);
            emitSendMessage(user.email, otherUser.email, form.content.value);
            form.content.value = "";
        });
    },
    "header": () => {
        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="nav">
                <button id="nav-index" class="btn btn-info">Home</button>
                <button id="nav-login" class="btn btn-info">Login</button>
                <button id="nav-register" class="btn btn-info">Register</button>
            </nav>
        `;
        document.querySelector("#nav-index").addEventListener("click", () => loadPage("index"));
        document.querySelector("#nav-login").addEventListener("click", () => loadPage("login"));
        document.querySelector("#nav-register").addEventListener("click", () => loadPage("register"));
    },
    "header-logged": (user) => {
        const header = document.querySelector(".header");
        header.innerHTML = `
            <img class="logo" src="./assets/complete-logo.svg" alt="ZipZop Logo">
            <nav class="nav">
                <p class="header__text">Welcome, ${user.nickname}</p>
                <button id="nav-chats" class="btn btn-info">Chats</button>
                <button id="nav-profile" class="btn btn-info">My profile</button>
                <button id="nav-logout" class="btn btn-info">Log out</button>
            </nav>
        `;
        document.querySelector("#nav-chats").addEventListener("click", () => emitLoadHomepage(user.email));
        document.querySelector("#nav-profile").addEventListener("click", () => loadProfile(user));
        document.querySelector("#nav-logout").addEventListener("click", () => emitLogout(user.email));
    },
    "profile": (user) => {
        document.querySelector(".profile-title").textContent = `${user.nickname}'s profile`;
        document.querySelector(".profile-email").textContent = `Email: ${user.email}`;
        document.querySelector("#current-nickname").textContent = `Current nickname: ${user.nickname}`;

        const formNickname = document.querySelector("#change-nickname");
        formNickname.addEventListener("submit", (event) => {
            event.preventDefault();

            if (formNickname.nickname.value === user.nickname) {
                showMessage("error", "That's already your nickname")
                return;
            }

            if (formNickname.nickname.value.length < 3) {
                showMessage("error", "Nickname should have at least three characters");
                return;
            }
        
            emitChangeNickname(user, formNickname.nickname.value);
            formNickname.nickname.value = "";
        });

        const formPassword = document.querySelector("#change-password");
        formPassword.addEventListener("submit", (event) => {
            event.preventDefault();

            if (formPassword.newPassword.value.length < 7) {
                showMessage("error", "Password should be at least 7 characters long");
                return;
            }

            if (formPassword.newPassword.value !== formPassword.confirmNewPassword.value) {
                showMessage("error", "Passwords aren't matching");
                return;
            }

            emitChangePassword(user, formPassword.newPassword.value);
        });
    }
};