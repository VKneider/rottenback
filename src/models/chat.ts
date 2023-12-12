import { model, Schema, Document } from "mongoose";

export interface IChat extends Document {
    isGroup: null | string;
    members: string[];
}

const chatSchema = new Schema<IChat>({
    isGroup: {
        type: String || null,
        required: true,
        default: null,
    },
    members: {
        type: [String],
        required: false,
        default: [],
    },
});

const ChatCollection = model<IChat>("Chat", chatSchema);

export default ChatCollection;