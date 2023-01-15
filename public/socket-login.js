const socket = io();

export function loadLogin() {
    socket.emit("loadpage", "login")
}

export function emitLogin(email, password) {
    socket.emit("login", email, password);
}