import { model, Schema, Document } from "mongoose";

export interface IMessage extends Document {
    chatId: string;
    senderId: string;
    sentAt: Date;
    content : string;
}

const messageSchema = new Schema<IMessage>({
    chatId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    sentAt: {
        type: Date,
        required: true,
    },
    content : {
        type : String,
        required : true,
    }
    
});

const MessageCollection = model<IMessage>("Message", messageSchema);

export default MessageCollection;