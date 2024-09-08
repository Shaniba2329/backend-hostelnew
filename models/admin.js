const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
    {
       
        emailid:{type:String,required:true},
        password:{type:String,required:true},
    
    }
)
let userModel =mongoose.model("userdata",userSchema)
module.exports={userModel}