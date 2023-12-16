import ApiResponse from "../utils/ApiResponse.js";
import { Request, Response } from "express";
import ChatCollection from "../models/chat.js";
import fetchHandler from "../utils/FetchHandler.js";
import MessageCollection from "../models/message.js";

export default class chatController {

    //post for easier coding
    static openChat = async (req: any, res: any) => {
        let { isGroup, members, chatId, description } = req.body;



        let chatFlag;

        if(chatId){
            chatFlag = await ChatCollection.findById(chatId);
        }else {
            chatFlag = await ChatCollection.findOne({ members: { $all: members } });
        }

        if (!chatFlag) {
            
            const newChat = await ChatCollection.create({ isGroup, members, description });
            await newChat.save();

            if (!newChat) {
                return ApiResponse.error(res, "Error creating chat", 400);
            }
            
            return ApiResponse.success(res, "Chat created", {
                chat: newChat,
                messages: [],
            });

        }

        const messages = await MessageCollection.find({ chatId: chatFlag._id }).populate("senderId").sort({ createdAt: -1 })

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


    static deleteChat = async (req: any, res: any) => {
        const { chatId } = req.params;
        const chat = await ChatCollection.findByIdAndDelete(chatId);

        if (!chat) {
            return ApiResponse.error(res, "Error deleting chat, doesnt exist", 400);
        }

        await MessageCollection.deleteMany({ chatId });
        return ApiResponse.success(res, "Chat deleted", chat);
    }


    
}