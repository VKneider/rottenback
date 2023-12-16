import app from "./app.js";
import mongoose, { mongo } from "mongoose";
import { Server } from "socket.io";
import MessageController from "./controllers/message.controller.js";
import { createServer } from "http";


const connectDB = async () => {
    try {
        const conn = mongoose.connect(process.env.DB!);
        console.log("Mongodb Connection stablished");
    } catch (error) {
        console.log("Mongodb connection error:", error);
        process.exit();
    }
};

connectDB().then(() => {
    console.log("Mongodb connected");
});

const httpServer = createServer(app);

let io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});


io.on("connection", (socket:any) => {
    
    socket.on("joinRoom", (data:any) => {
        socket.join(data.chatId);
        //send a message to the user who joined the room
        socket.emit("receiveMessage", {message:"You joined the room"}); 
    });

    socket.on("sendMessage", async (data:any) => {
        await MessageController.sendMessage(data, null);
        io.to(data.chatId).emit("newMessage", data);
    });

    // Evento para desconexión
    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
    });
});




