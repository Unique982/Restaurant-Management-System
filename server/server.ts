import app from "./src/app";
<<<<<<< HEAD
import { Server } from "socket.io";
import http from "http";
//dotenv config garna
=======
>>>>>>> fb35e2af63cda14e17943774b4a92e04452ece25
import { config } from "dotenv";
config()

<<<<<<< HEAD
config();

// create http server  from express app
const server = http.createServer(app);

// socket.io setup garnu paro
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});

// ecport io instance for controllers ko lagai
export const getIO = () => io;
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
=======
//database connection import 
// import garena vane connect hudainw or file execute hudainw 
import "./src/database/connection"
function startServer(){
    const port = process.env.PORT 
    app.listen(port,function(){
        console.log(`Server has started at port ${port}`)
    }) 
}

startServer()

//sudo /Applications/XAMPP/xamppfiles/xampp start
>>>>>>> fb35e2af63cda14e17943774b4a92e04452ece25
