import express from 'express'
import userRoute from './routes/user.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js'
const app = express();
dotenv.config()
connectDb()
app.use(cookieParser())
app.use(express.json())

app.use('/',userRoute)


export default app;