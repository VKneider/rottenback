import { model, Schema, Document, Types  } from "mongoose";

export interface IMessage extends Document {
    chatId: Types.ObjectId;
    senderId: string;
    sentAt: Date;
    content : string;
}

const messageSchema = new Schema<IMessage>({
    chatId: {
        type: Schema.Types.ObjectId,
        ref: "Chat",
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