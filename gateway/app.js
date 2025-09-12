import express from 'express'
import expressProxy from 'express-http-proxy'
import { globalLimiter } from  './middleware/limit.js';
const app = express();
app.use(globalLimiter());
app.use('/user',expressProxy('http://localhost:3001'))
app.use('/captian',expressProxy('http://localhost:3002'))
app.use('/ride',expressProxy('http://localhost:3003'))

app.listen(3000,()=>{
    console.log("Server Started");
})