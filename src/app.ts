import express from 'express';
import cors from 'cors';
import "dotenv/config"
import passport from 'passport'

import passportMiddleware from './middlewares/passport.js';

import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import MediaRouter from './routes/media.routes..js';
import ReviewRouter from './routes/review.routes.js';
import ChatRouter from './routes/chat.routes.js';

const app = express();



app.set('port', process.env.PORT|| 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(passport.initialize())
passport.use(passportMiddleware)


app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/media', MediaRouter)
app.use('/review', ReviewRouter)
app.use('/chat', ChatRouter)


export default app;