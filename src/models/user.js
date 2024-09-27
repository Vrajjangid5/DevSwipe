const mongoose = require("mongoose");
const validator= require("validator");
const Jwt = require("jsonwebtoken");
const bcrypt =require("bcrypt");

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

userSchema.methods.getJWT= async function(){
    const user=this;

    const token = await Jwt.sign({_id:user._id},"@Vrajjangid123#@!",{expiresIn:'2d'});
    return token;
}

userSchema.methods.isPasswordValid=async function (password){
    const user=this;
    const isPassValid= await bcrypt.compare(password, user.password);
    return isPassValid
}

module.exports= mongoose.model("User",userSchema);