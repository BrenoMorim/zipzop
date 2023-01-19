import express from 'express';

import url from 'url';
import path from 'path';
import http from 'http';

import { Server } from 'socket.io';
import socketBackend from './socket-backend.js';

import "./db/db.js";

const pathPublic = path.join(url.fileURLToPath(import.meta.url), "../..", "public");
const port = process.env.SERVER_PORT || '3000';
const app = express();
const httpServer = http.createServer(app);

// Instantiate the server

httpServer.listen(port, () => {
    console.log(`Server listening at ${port}`);
});

app.use(express.static(pathPublic));
const io = new Server(httpServer);

socketBackend(io);

export default io;