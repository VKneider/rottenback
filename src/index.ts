import app from "./app.js";
import mongoose, { mongo } from "mongoose";
import { Server } from "socket.io";
import MessageController from "./controllers/message.controller.js";

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

let server = app.listen(app.get("port"));
let io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    transports: ["websocket", "polling"]
});

io.on("connection", (socket:any) => {
    
    socket.on("joinRoom", (data:any) => {
        socket.join(data.chatId);
        //send a message to the user who joined the room
        socket.emit("receiveMessage", {message:"You joined the room"}); 
    });

    socket.on("sendMessage", async (data:any) => {
        await MessageController.sendMessage(data, null);
        socket.broadcast.to(data.chatId).emit("receiveMessage", data);

    });

    // Evento para desconexión
    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
    });
});




