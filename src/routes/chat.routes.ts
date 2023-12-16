import {Router} from 'express'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';
import chatController from '../controllers/chat.controller.js';

let ChatRouter = Router();

ChatRouter.post("/", chatController.openChat);

export default ChatRouter;
