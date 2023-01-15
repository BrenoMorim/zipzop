const socket = io();

export function loadRegister() {
    socket.emit("loadpage", "register")
}

export function emitRegister(nickname, email, password) {
    socket.emit("register", nickname, email, password);
}