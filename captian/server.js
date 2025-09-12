import  http from 'http'
import app from './app.js'
const server = http.createServer(app);

server.listen(3002,()=>{
    console.log("User Server Running at 3002")
})