import express from 'express';
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './routes/auth.js'
import userRoute from "./routes/user.js"
import leaderboardRoute from "./routes/leaderboard.js";

const app = express();
dotenv.config()

// constants

const PORT = process.env.PORT || 3002
const LINK = process.env.MONGO_URI || "mongodb://mongo:27017/mydb"
export const JWT_SECRET = process.env.JWT_SECRET || "abcdef123321"

// middlewares

app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static("uploads"))


// routes

app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/leaderboard', leaderboardRoute);

async function start() {
    try {
        await mongoose.connect(LINK, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        app.listen((PORT), () => {
            console.log('server started')
        })
    } catch (error) {
        console.log(error)
    }
}

start();