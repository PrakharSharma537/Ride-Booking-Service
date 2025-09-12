import mongoose from "mongoose";

const connectDb = async function(req,res){
    try {
        mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error);   
    }
}
export default connectDb;