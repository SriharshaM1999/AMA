const User = require("../../../../../model/Ta/Ta")


const jwt = require("jsonwebtoken");


module.exports.signIn= async function(req,res){

 try{

     const email=req.body.email;
     const password=req.body.password;


    let user = await User.findOne({email:email});
 
    if(!user || user.password!= password){ 
        return res.json(422,{
            message:"Invalid user name or password"
        })
    }

    return res.json(200,{
        message:" Successfully logged in here is your token",
        data:{
            token:jwt.sign(user.toJSON(),'secret',{expiresIn:'10000000'}),
            username:user.username
        }
    })





}
 catch(err){
     console.log(err);
     return res.json(500,{
        message:"Internal Server Error"
    })
 }



}