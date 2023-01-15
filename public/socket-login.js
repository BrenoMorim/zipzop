const socket = io();

export function emitLogin(email, password) {
    socket.emit("login", email, password);
}