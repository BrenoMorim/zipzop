import { pages } from "./pages.js";
import { scripts } from "./scripts.js";
import "./socket-index.js";

export function loadPage(page) {
    document.querySelector("main").innerHTML = pages[page];
    scripts[page]();
}

export function loadHeader(isLogged) {
    if (isLogged) {
        scripts["header-logged"]();
    } else {
        scripts["header"]();
    }
}

export function showMessage(kind, message) {
    
}
