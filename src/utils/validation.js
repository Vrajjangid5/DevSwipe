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
const validationEdit = (req) => {
    const ALLOWED_EDIT = ["firstName", "lastName", "gender", "skill", "about", "photoUrl"];
    
    // Ensure all keys in the request body are allowed fields
    const isAllowed = Object.keys(req.body).every((key) => ALLOWED_EDIT.includes(key));
    
    return isAllowed;
};
module.exports = {
    signUpValidation,
    validationEdit,
};