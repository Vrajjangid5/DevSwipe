const express =require("express");
const profieRouter = express.Router();
const {userAuth} = require("../middlewares/auth");



profieRouter.get("/profile",userAuth,async(req,res)=>{
    try{
        const user = req.user
         res.send(user)
        }catch(err){
        res.status(500).send({ error: "Something went wrong", details: err.message });

    }
})

module.exports = profieRouter;