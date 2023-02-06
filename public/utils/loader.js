// Hides the loader and displays the main container
export function hideLoader() {
    const loader = document.querySelector(".loader-container");
    const main = document.querySelector("main.container");
    main.classList.remove("hidden");
    loader.classList.add("hidden");
}

// Hides the main container and shows the loader
export function showLoader() {
    const loader = document.querySelector(".loader-container");
    const main = document.querySelector("main.container");
    main.classList.add("hidden");
    loader.classList.remove("hidden");
}