import { loadHeader, loadPage } from "./index.js";

const socket = io();

socket.on("loadpage", (page) => {
    loadPage(page);
});

socket.on("loadheader", (isLogged) => {
    loadHeader(isLogged)
});

socket.on("message", (kind, message) => {
    showMessage(kind, message);
});