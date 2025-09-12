import mongoose from "mongoose";

const captianSchema = mongoose.Schema({
   name:{
      type: String,
      required:true
   },
   email:{
      type: String,
      required:true,
      unique:true
    },
   password:{
      type: String,
      required:true
    },
   Contact:{
      type:String,
      required:true
   },
   isAvailable:{
      type:Boolean,
      default:false
   }
})
const captianModel = mongoose.model('captian',captianSchema)
export default captianModel;