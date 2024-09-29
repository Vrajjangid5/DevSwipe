const express= require("express");
const authRouter = express.Router();
const {signUpValidation} = require("../utils/validation")
const bcrypt = require("bcrypt");
const User= require("../models/user");
const Jwt= require("jsonwebtoken");


authRouter.post("/signup",async(req,res)=>{
    // console.log(req.body);
    // const userData={
    //     firstName:"vraj",
    //     lastName:"Jangid",
    //     email:"vrajjangid5@gmail.com",

    //     age:20,
    //     gender:"male",
    // }
    try{
        const {firstName,lastName,email,password}= req.body;


        signUpValidation(req);
        const passwordHash= await bcrypt.hash(password,10);

        const user =new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
        });
        await user.save();
        res.send("user Added SuccessFully");
    }catch(err){
        res.status(400).send({ message: 'An error occurred' });
    }
})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            // Send the same error message for both email and password to avoid exposing details
            return res.status(400).send({ error: "Invalid credentials" });
        }

        // Compare password
        const isPasswordValid = await user.isPasswordValid(password);
        if (!isPasswordValid) {
            return res.status(400).send({ error: "Invalid credentials" });
        }

        // If login is successful
        const token= await user.getJWT();
        res.cookie("token",token,{expires:new Date(Date.now()+8*3600000),});
        res.send("Login successful!" );
    } catch (err) {
        // Catch any unexpected errors
        res.status(500).send({ message: "An error occurred", details: err.message });
    }
});

authRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{
        expires: new Date(Date.now()),
    });
    res.send("logout success");
})

module.exports =authRouter;