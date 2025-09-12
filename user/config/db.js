import mongoose from "mongoose";
import userModel from "../models/user.model.js";

const connectDb = async()=>{
    try{
      mongoose.connect(process.env.MONGODB_URI)
    }catch(error){
      console.log(error)
    }
}
export default connectDb;
