const express = require("express");
const userRouter = express.Router();
const User = require("../models/user");

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
        const loggedInUser= req.user;

        const page = parseInt(req.query.page)||1;
        let limit=parseInt(req.query.limit)||10;
        limit=limit>50?50:limit;
        const skip= (page-1)*limit;

        const connectionReq = await connectionRequest.find({
            $or:[
                {fromUserId:loggedInUser},
                {toUserId:loggedInUser},
            ]
        }).select("fromUserId toUserId");
        const hideUserFromFeed = new Set();
        connectionReq.forEach((req)=>{
            hideUserFromFeed.add(req.fromUserId.toString()),
            hideUserFromFeed.add(req.toUserId.toString())
        })
        const users= await User.find({
            $and:[
                {_id:{$nin:Array.from(hideUserFromFeed)}},
                {_id:{$ne:loggedInUser._id}},
            ]
        }).select("firstName lastName").skip(skip).limit(limit);
        res.send(users);
        
    } catch (error) {
        res.status(400).send("Error : "+error.message);
    }
})

module.exports= userRouter;