import mongoose from "mongoose";

const connectDb = async()=>{
    try{
      mongoose.connect(process.env.MONGODB_URI)
    }catch(error){
      console.log(error)
    }
}
export default connectDb;
