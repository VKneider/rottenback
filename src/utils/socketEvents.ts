import MessageController from "../controllers/message.controller.js";

export default function chatEvents(io: any){

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


}