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

userRouter.get("/user/connections",userAuth,async(req,res)=>{
    try {
        const loggedInUser= req.user;
        const connectionReq = await connectionRequest.find({
            $or:[
                {toUserId:loggedInUser._id,status:"accepted"},
                {fromUserId:loggedInUser._id,status:"accepted"}
            ]
        }).populate("fromUserId","firstName lastName").populate("toUserId","firstName lastName");
        const data = connectionReq.map((row)=>{
            if(row.fromUserId._id.toString()==loggedInUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })
        res.send({data});
    } catch (error) {
        res.status(400).send("ERROR : "+error.message);
    }
})

userRouter.get("/user/feed",userAuth,async(req,res)=>{
    try {
        
    } catch (error) {
        res.status(400).send("Error : "+error.message);
    }
})

module.exports= userRouter;