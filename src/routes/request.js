const express = require("express");
const requestRouter = express.Router();
const {userAuth}= require("../middlewares/auth");
const connectionRequest=require("../models/requestConnection");
const User = require("../models/user")



requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{
    try {
        
        const fromUserId= req.user._id;
        const toUserId= req.params.toUserId;
        const status=req.params.status;
        const allowedStatus= ["intersted","ignored"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"invalid status type: "+status
            });
        }
        const exitingUser= await connectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {
                    fromUserId:toUserId,
                    toUserId:fromUserId,
                },
            ],
        })
        if(exitingUser){
            return res.status(400).send({
                message:"connection request send already"
            })
        };
        const user = await User.findById(toUserId);
        if(!user){
            return res.status(404).send({
                message: "user not found",
            })
        }
        const connectionReq= new connectionRequest({
            fromUserId,toUserId,status,
        });
        const data= await connectionReq.save();
        res.json({
            message:"connect request send successfully",
            data,
        })


    } catch (error) {
        res.status(400).send("ERROR: "+error.message);
    }
})



module.exports= requestRouter;