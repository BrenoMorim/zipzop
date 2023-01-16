import db from "../db/db.js";

export function getChatsByUser(email) {
    const chats = db.prepare("SELECT * FROM chats WHERE participant1 = ? or participant2 = ?;").get(email, email);
    if (chats.length === undefined) {
        return [chats];
    }
    return chats;
}

export function getMessages(chatId) {
    const messages = db.prepare("SELECT * FROM messages WHERE chat_id = ?;").get(chatId);
    if (messages === undefined) return undefined;
    if (messages.length === undefined) {
        return [messages];
    }
    return messages;
}

export function getChatByParticipants(p1, p2) {
    return db.prepare("SELECT * FROM chats WHERE (participant1 = ? AND participant2 = ?) OR (participant1 = ? AND participant2 = ?);").get(p1, p2, p2, p1);
}

export function createNewChat(p1, p2) {
    return db.prepare("INSERT INTO chats (participant1, participant2) VALUES (?, ?);").run(p1, p2);
}
