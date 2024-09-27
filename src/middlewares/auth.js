// const adminAuth=(req,res,next)=>{
//     const token="xyz";
//     const isAdmin=token==="xyz";
//     if(!isAdmin){
//         res.status(404).send("Unauthrize User")
//     }else{
//         next();
//     }

// }
const User = require("../models/user");
const Jwt= require("jsonwebtoken");
const userAuth=async(req,res,next)=>{
    try{const {token} = req.cookies;
    if(!token){
        throw new Error("Token is not valid");
    }
    const decodedMsg = await Jwt.verify(token,"@Vrajjangid123#@!");
    const {_id}= decodedMsg;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("user not define");
    }  
    req.user=user;
    next();} catch(err){
        res.status(400).send({ error: "Something went wrong", details: err.message });

    } 

}

module.exports={
    userAuth,
}