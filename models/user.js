const mongoose=require("mongoose")
const userSchema=mongoose.Schema(
    {
        name:{type:String,required:true},
        emailid:{type:String,required:true},
        phoneno:{type:String,required:true},
        gender:{type:String,required:true},
        admissionno:{type:String,required:true},
        age:{type:String,required:true},
        password:{type:String,required:true},
        confirmpass:{type:String,required:true},

    }
)
let userModel =mongoose.model("userdata",userSchema)
module.exports={userModel}