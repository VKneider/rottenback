import app from "./app.js";
import mongoose, { mongo } from "mongoose";
import { Server } from "socket.io";
import MessageController from "./controllers/message.controller.js";
import userCollection from "./models/user.js";

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
    });

    socket.on("sendMessage", async (data:any) => {
        console.log("me llega esto del mensaje", data);
        await MessageController.sendMessage(data, null);
        const user = await userCollection.findById(data.senderId);
        data.senderId = user;
        socket.in(data.chatId).emit("receiveMessage", data);

    });

    // Evento para desconexión
    socket.on("disconnect", () => {
        console.log("Usuario desconectado:", socket.id);
    });
});




