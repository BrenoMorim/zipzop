import { schema } from "./db-schema.js";

import Database from 'better-sqlite3';
const db = new Database('./zipzop.db');
db.pragma('journal_mode = WAL');
db.exec(schema);

export default db;
