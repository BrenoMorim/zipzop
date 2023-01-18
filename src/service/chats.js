import db from "../db/db.js";

export function getChatsByUser(email) {
    const chats = db.prepare("SELECT * FROM chats WHERE participant1 = ? or participant2 = ? ORDER BY last_updated DESC;").all(email, email);
    return chats;
}

export function getMessages(chatId, size) {
    const messages = db.prepare("SELECT * FROM messages WHERE chat_id = ? ORDER BY date DESC LIMIT ?;").all(chatId, size);
    return messages;
}

export function countMessages(chatId) {
    return db.prepare("SELECT COUNT(*) FROM messages WHERE chat_id = ?;").get(chatId)['COUNT(*)'];
}

export function getChatByParticipants(p1, p2) {
    return db.prepare("SELECT * FROM chats WHERE (participant1 = ? AND participant2 = ?) OR (participant1 = ? AND participant2 = ?);").get(p1, p2, p2, p1);
}

export function createNewChat(p1, p2) {
    return db.prepare("INSERT INTO chats (participant1, participant2, last_updated) VALUES (?, ?, ?);").run(p1, p2, new Date().toISOString());
}

export function sendMessage(sender, receiver, content) {
    const chat = getChatByParticipants(sender, receiver);
    const now = new Date().toISOString();
    db.prepare("UPDATE chats SET last_updated = ? WHERE id = ?;").run(now, chat.id);
    return db.prepare("INSERT INTO messages (content, date, sender, receiver, chat_id) VALUES (?, ?, ?, ?, ?);").run(content, now, sender, receiver, chat.id);
}
