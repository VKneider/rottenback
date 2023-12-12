import MessageController from "../controllers/message.controller";

export default function chatEvents(io: any){

    io.on("connection", (socket:any) => {
    
        socket.on("joinRoom", (data:any) => {
            socket.join(data.roomId);
            console.log(`Usuario ${socket.id} se unió a la sala ${data.roomId}`);    
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