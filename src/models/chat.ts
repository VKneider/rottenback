import { model, Schema, Document } from "mongoose";

import "dotenv/config"

export interface IChat extends Document {
    isGroup : null | boolean;   
    members : string[];
     
}

const chatSchema = new Schema<IChat>({
    isGroup : {
    type : Boolean || null,
    required : true,
    default : null
    },
    members: {
    type : [String],
    required:false,
    default : []
    }
});

const chatCollection = model<IChat>("Chat", chatSchema);

export default chatCollection;

