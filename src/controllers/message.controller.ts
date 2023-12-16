import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import fetchHandler from "../utils/FetchHandler.js";
import MessageCollection from "../models/message.js";
import ChatCollection from "../models/chat.js";

export default class MessageController {

    static sendMessage = async (req: any, res: any) => {
        
        let { senderId, sentAt, chatId, content } = req

        content.trim();

        const message = await MessageCollection.create({ chatId, senderId, sentAt, content });

        if (!message) {
           // return ApiResponse.error(res, "Error sending message", 400);
        }

        //return ApiResponse.success(res, "Message sent", message);
    }


}

