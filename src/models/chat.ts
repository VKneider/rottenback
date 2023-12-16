import { model, Schema, Document, Types } from "mongoose";


export interface IChat extends Document {
    isGroup: null | string;
    members: string[]
    description?: string;
}

const chatSchema = new Schema<IChat>({
    isGroup: {
        type: String || null,
        required: true,
        default: null,
    },
    members: {
        type: [String],
        ref: "User",
        required: false,
        default: [],
    },
    description: {
        type: String,
        required: false,
        default: "",
    }
});

const ChatCollection = model<IChat>("Chat", chatSchema);

export default ChatCollection;