import formatDate from "./formatDate.js";

// Inserts message in chat
export default function insertMessage(content, date, type, author) {
    const li = document.createElement("li");
    
    li.innerHTML = `<p class="chat__message__info">
        <span class="chat__message__author"></span> 
        <span class="chat__message__content"></span>
        </p>
        <p class="chat__message__time">${formatDate(date)}</p>
    `;

    // Grants protection against XSS using textContent instead of innerHTML
    li.querySelector(".chat__message__author").textContent = `${author} >`;
    li.querySelector(".chat__message__content").textContent = content;
    li.classList.add("chat__message");
    li.classList.add(`chat__message--${type}`);

    document.querySelector(".chat").appendChild(li);
    document.querySelector(".chat__message--empty").style.display = 'none';
}