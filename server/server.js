"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = void 0;
const app_1 = __importDefault(require("./src/app"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
//dotenv config garna
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// create http server  from express app
const server = http_1.default.createServer(app_1.default);
// socket.io setup garnu paro
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});
// ecport io instance for controllers ko lagai
const getIO = () => io;
exports.getIO = getIO;
// listen fro connection
io.on("connection", (socket) => {
    console.log("New Client connected:", socket.id);
    socket.on("disconnect:", () => {
        console.log("Client Disconneted", socket.id);
    });
});
// create server
const startServer = () => {
    const port = process.env.PORT;
    server.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};
startServer();
