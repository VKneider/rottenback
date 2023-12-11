import { model, Schema, Document } from "mongoose";

import "dotenv/config"

export interface IMessage extends Document {
    chatId : string;
    senderId : string;
    sentAt : Date; 
}

const messageSchema = new Schema<IMessage>({
    chatId : {
    type : String,
    required : true,
    },
    senderId : {
    type : String,
    required : true,
    },
    sentAt : {
    type : Date,
    required : true,
    }
});

const messageCollection = model<IMessage>("Message", messageSchema);

export default messageCollection;

