import { model, Schema, Document, Types  } from "mongoose";

export interface IMessage extends Document {
    chatId: Types.ObjectId;
    senderId: Types.ObjectId;
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
        type: Schema.Types.ObjectId,
        ref: "User",
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