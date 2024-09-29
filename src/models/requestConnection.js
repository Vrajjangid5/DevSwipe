const mongoose = require("mongoose");

const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    },
    status:{
        type:String,
        enum:{
            values:["ignored","intersted","accepted","rejected"],
            message:`{VALUE} is incorrect status type`,
        },
    },
},{
    timestamps:true,
}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});

connectionRequestSchema.pre("save",function (){
    const connectionReq= this;
    if(connectionReq.fromUserId.equals(connectionReq.toUserId)){
        throw new Error("Cannot send the req. to yourself");
    }
    next();
})

const connectionRequestModel =new mongoose.model(
    "connectionRequest",
    connectionRequestSchema,
);

module.exports=connectionRequestModel;