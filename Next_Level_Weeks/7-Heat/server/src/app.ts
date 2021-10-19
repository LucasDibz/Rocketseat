import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { router } from './routes';

const app = express();
app.use(cors());
app.use(express.json());

const serverhttp = http.createServer(app);

const io = new Server(serverhttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`New client connected ${socket.id}`);
});

app.use(router);

export { serverhttp, io };
