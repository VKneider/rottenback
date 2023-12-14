import { model, Schema, Document, Types } from "mongoose";


export interface IChat extends Document {
    isGroup: null | string;
    members: Types.ObjectId[];
}

const chatSchema = new Schema<IChat>({
    isGroup: {
        type: String || null,
        required: true,
        default: null,
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: "User",
        required: false,
        default: [],
    },
});

const ChatCollection = model<IChat>("Chat", chatSchema);

export default ChatCollection;