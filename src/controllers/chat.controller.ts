import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import ChatCollection from "../models/chat";
import fetchHandler from "../utils/FetchHandler.js";
import MessageCollection from "../models/message";

export default class chatController {

    //post for easier coding
    openChat = async (req: any, res: any) => {
        const { isGroup, members, chatId } = req.body;

        
        const chatFlag = await ChatCollection.findOne({ members: { $all: members } });

        if (!chatFlag) {
            
            const newChat = await ChatCollection.create({ isGroup, members });
            if (!newChat) {
                return ApiResponse.error(res, "Error creating chat", 400);
            }
            
            return ApiResponse.success(res, "Chat created", {
                chat: newChat,
                messages: [],
            });

        }

        const messages = await MessageCollection.find({ chatId: chatFlag._id }).sort({ createdAt: -1 });

        if (!messages) {
            return ApiResponse.success(res, "Chat found with no messages", {
                chat: chatFlag,
                messages: [],
            });
        }

        return ApiResponse.success(res, "Chat found", {
            chat: chatFlag,
            messages,
        });

        }


    deleteChat = async (req: any, res: any) => {
        const { chatId } = req.params;
        const chat = await ChatCollection.findByIdAndDelete(chatId);

        if (!chat) {
            return ApiResponse.error(res, "Error deleting chat, doesnt exist", 400);
        }

        await MessageCollection.deleteMany({ chatId });
        return ApiResponse.success(res, "Chat deleted", chat);
    }


    
}