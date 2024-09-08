const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { userModel } = require("./models/user")



const app=express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://shaniba:7907586363@cluster0.xsue8.mongodb.net/hosteldb?retryWrites=true&w=majority&appName=Cluster0")

const generateHashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return bcrypt.hash(password, salt)
}
app.post("/usersignup", async (req, res) => {
    let input = req.body
    let hashedPassword = await generateHashedPassword(input.password)
    console.log(hashedPassword)
    input.password = hashedPassword
    let user = new userModel(input)
    user.save()
    res.json({ "status": "success" })
})

app.post("/usersignin", (req, res) => {
    let input = req.body
     userModel.find({"emailid":req.body.emailid}).then(
        (response)=>{
           if (response.length>0) {
            let dbPassword=response[0].password
            console.log(dbPassword)
            bcrypt.compare(input.password,dbPassword,(error,isMath)=>{
                if (isMath) {
                   jwt.sign({emailid:input.emailid},"hostel-app",{expiresIn:"1d"},(error,token)=>{
                    if(error){
                        res.json({"status":"unable to create token"})
                    }else{
                        res.json({"status":"success","userid":response[0]._id,"token":token})
                    }
                   })
                } else {
                    
                    res.json("incorrect password")
                }
            })
           } else {

            res.json({"status":"user not found"})

           }
        }
    ).catch()

})

app.post("/adminlogin",(req,res)=>{
    let input=req.body
    let result=userModel.find({username:input.username}).then(
        (response)=>{
            if (response.length>0) {
                const validator=bcrypt.compareSync(input.password,response[0].password)
                if(validator)
                {
                    jwt.sign({emailid:input.username},"hostel-app",{expiresIn:"1d"},
                    (error,token)=>{
                        if (error) {
                            res.json({"status":"Token Creation Failed"})

                        } else {
                            res.json({"status":"success","token":token})

                        }
                    })
                }else
                {
                    res.json({"status":"Wrong Password"})
                }
            } else {
                res.json({"status":"Invalid Authentication"}) 
            }
        }
    ).catch()
})
app.listen(8080,()=>{
console.log("server started")
})