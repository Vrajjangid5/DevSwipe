const express = require("express");
const userRouter = express.Router();

const {userAuth}= require("../middlewares/auth");

const connectionRequest = require("../models/requestConnection");

//Get all the pending connection request for the loggegd in user

userRouter.get("/user/requests/received",userAuth,async(req,res)=>{
    try {

        const loggedInUser= req.user;
        const connectionReq = await connectionRequest.find({
            toUserId:loggedInUser._id,
            status:"intersted",
        }).populate("fromUserId",["firstName","lastName"]);
        res.json({
            message:"Data fetched Success",
            data:connectionReq,
        })
        
    } catch (error) {
        res.status(400).send("ERROR: ",error.message);
    }
})


module.exports= userRouter;