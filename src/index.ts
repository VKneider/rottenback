import app from "./app.js";
import mongoose, { mongo } from "mongoose";
import { Server } from "socket.io";

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
    }
});

io.on("connection", socket => {
    console.log("Usuario conectado:", socket.id);

});



const movieRooms = new Map();
const tvRooms = new Map();
