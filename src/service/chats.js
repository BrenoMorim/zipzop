import db from "../db/db.js";

export function getChatsByUser(email) {
    const chats = db.prepare("SELECT * FROM chats WHERE participant1 = ? or participant2 = ?;").all(email, email);

    return chats;
}

export function getMessages(chatId) {
    const messages = db.prepare("SELECT * FROM messages WHERE chat_id = ?;").all(chatId);
    return messages;
}

export function getChatByParticipants(p1, p2) {
    return db.prepare("SELECT * FROM chats WHERE (participant1 = ? AND participant2 = ?) OR (participant1 = ? AND participant2 = ?);").get(p1, p2, p2, p1);
}

export function createNewChat(p1, p2) {
    return db.prepare("INSERT INTO chats (participant1, participant2) VALUES (?, ?);").run(p1, p2);
}

export function sendMessage(sender, receiver, content) {
    const chat = getChatByParticipants(sender, receiver);
    return db.prepare("INSERT INTO messages (content, date, sender, receiver, chat_id) VALUES (?, ?, ?, ?, ?);").run(content, new Date().toISOString(), sender, receiver, chat.id);
}
