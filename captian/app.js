import express from 'express'
import captianRoute from './routes/captian.route.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import connectDb from './config/db.js'
import {listenForRide} from './rabbitmq/captian.consumer.js'
const app = express();
dotenv.config()
connectDb()
listenForRide()
app.use(cookieParser())
app.use(express.json())

app.use('/',captianRoute)


export default app;