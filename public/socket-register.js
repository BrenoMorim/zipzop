const socket = io();

export function emitRegister(nickname, email, password) {
    socket.emit("register", nickname, email, password);
}