import { loadPage } from "./index.js";

const socket = io();

socket.on("loadpage", (page) => {
    loadPage(page);
});