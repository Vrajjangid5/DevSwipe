const mongoose = require("mongoose");
const validator= require("validator");


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
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is Incorrect")
            }
        }
    },
    password:{
        type:String,
        requried:true,
        trim:true,
        minLength:8,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter the Strong Password")
            }
        }
    },
    age:{
        type:Number
    },
    photoUrl:{
        type:String,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Enter the Write URL")
            }
        }
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