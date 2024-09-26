const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        requried:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        requried:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        requried:true,
        trim:true,
        minLength:8,
    },
    age:{
        type:Number
    },
    photoUrl:{
        type:String
    },
    gender:{
        type:String,
        default:"male",
    },
    about:{
        type:String
    },
    skill:{
        type:[String]
    },
},{
    timestamps:true,
});

module.exports= mongoose.model("User",userSchema);