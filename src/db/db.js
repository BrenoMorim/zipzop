import { schema } from "./db-schema.js";
import path from 'path';
import url from 'url';
import Database from 'better-sqlite3';

const pathDb = path.join(url.fileURLToPath(import.meta.url), "../../../", "zipzop.db");

const db = new Database(pathDb);
db.pragma('journal_mode = WAL');
db.exec(schema);

export default db;
