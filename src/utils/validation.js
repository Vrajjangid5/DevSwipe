const validator = require("validator");

const signUpValidation =(req)=>{
    const {firstName,lastName,password,email}=req.body;
    if(!firstName || !lastName){
        throw new Error("Name is not valid");
    }else if(!validator.isEmail(email)){
        throw new Error("email is not valid");

    }else if(!validator.isStrongPassword(password)){
        throw new Error("password is not valid");

    }
}

module.exports = {
    signUpValidation,
};