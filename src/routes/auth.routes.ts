import {Router} from 'express'
import authController from '../controllers/auth.controller.js'
import schemas from '../validations/schemas.js';
import validationYup from '../middlewares/validationYup.js';

let authRouter = Router();

authRouter.post("/register",validationYup(schemas.registerSchema),authController.register);
authRouter.post("/login",validationYup(schemas.loginSchema),authController.login);

export default authRouter;


const movieForums = [
    { "chatId": 28, "name": "Action" },
    { "chatId": 12, "name": "Adventure" },
    { "chatId": 16, "name": "Animation" },
    { "chatId": 35, "name": "Comedy" },
    { "chatId": 80, "name": "Crime" },
    { "chatId": 99, "name": "Documentary" },
    { "chatId": 18, "name": "Drama" },
    { "chatId": 10751, "name": "Family" },
    { "chatId": 14, "name": "Fantasy" },
    { "chatId": 36, "name": "History" },
    { "chatId": 27, "name": "Horror" },
    { "chatId": 10402, "name": "Music" },
    { "chatId": 9648, "name": "Mystery" },
    { "chatId": 10749, "name": "Romance" },
    { "chatId": 878, "name": "Science Fiction" },
    { "chatId": 10770, "name": "TV Movie" },
    { "chatId": 53, "name": "Thriller" },
    { "chatId": 10752, "name": "War" },
    { "chatId": 37, "name": "Western" }
];