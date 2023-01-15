import { pages } from "./pages.js";
import { scripts } from "./scripts.js";
import "./socket-index.js";

export function loadPage(page) {
    document.querySelector("main").innerHTML = pages[page];
    scripts[page]();
}

export function loadNav(isLogged) {
    
}
