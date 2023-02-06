export function setCookie(key, value) {
    document.cookie = `${key}=${value};path=/`;
}

export function getCookie(key) {
    return document.cookie
        .split('; ')
        .find((cookie) => cookie.startsWith(`${key}=`))
        ?.split("=")[1];
}

export function removeCookie(key) {
    document.cookie = `${key}=;expires=Thu, 01 Jan 1970 00:00:00`;
}
