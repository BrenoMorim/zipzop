// Creates the tables in database

export const schema = `CREATE TABLE IF NOT EXISTS users (
    nickname TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    hash TEXT NOT NULL,
    profile_picture BLOB,
    PRIMARY KEY (email)
);

CREATE UNIQUE INDEX IF NOT EXISTS user_id ON users(email);

CREATE TABLE IF NOT EXISTS chats (
    id INTEGER NOT NULL UNIQUE,
    participant1 TEXT NOT NULL,
    participant2 TEXT NOT NULL,
    last_updated DATETIME NOT NULL,
    FOREIGN KEY (participant1) REFERENCES users (email),
    FOREIGN KEY (participant2) REFERENCES users (email),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS participants ON chats(participant1, participant2);

CREATE TABLE IF NOT EXISTS messages (
    id INTEGER NOT NULL UNIQUE,
    content TEXT NOT NULL,
    date DATETIME NOT NULL,
    sender TEXT NOT NULL,
    receiver TEXT NOT NULL,
    chat_id INTEGER NOT NULL,
    FOREIGN KEY (sender) REFERENCES users (email),
    FOREIGN KEY (receiver) REFERENCES users (email),
    FOREIGN KEY (chat_id) REFERENCES chats (id),
    PRIMARY KEY (id)
);

CREATE INDEX IF NOT EXISTS chat_id ON messages(chat_id);
`;