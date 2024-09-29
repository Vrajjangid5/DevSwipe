const express =require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validationEdit} = require("../utils/validation");
const bcrypt = require('bcrypt');


profileRouter.get("/profile/view",userAuth,async(req,res)=>{
    try{
        const user = req.user
         res.send(user)
        }catch(err){
        res.status(500).send({ error: "Something went wrong", details: err.message });

    }
});
profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        // Validate the edit request
        if (!validationEdit(req)) {
            throw new Error("Invalid Edit Request");
        }

        // `userAuth` middleware adds user to the request
        const user = req.user;

        // Log the current user details before the update
      //  console.log("Before update:", user);

        // Update user details with data from request body
        Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

        // Log updated user details
      //  console.log("After update:", user);
       await user.save()
        // Respond with a success message and the updated user object
        res.send("Edit success");
        
    } catch (err) {
        res.status(400).send({ error: "Something went wrong", details: err.message });
    }
});




// Edit Password Route
profileRouter.patch("/profile/editPassword", userAuth, async (req, res) => {
    try {
        const { previousPassword, newPassword } = req.body;

        // Ensure both previous and new passwords are provided
        if (!previousPassword || !newPassword) {
            return res.status(400).send({ error: "Previous and new password must be provided" });
        }

        // Get the authenticated user from the request
        const user = req.user;

        // Compare the previous password with the stored hashed password
        const isMatch = await bcrypt.compare(previousPassword, user.password);
        if (!isMatch) {
            return res.status(400).send({ error: "Previous password is incorrect" });
        }

        // Encrypt the new password before storing
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password with the new hashed password
        user.password = hashedPassword;

        // Save the user with the updated password (assuming a save function or database update logic)
        await user.save();

        res.send({ message: "Password changed successfully" });
        
    } catch (err) {
        res.status(500).send({ error: "Something went wrong", details: err.message });
    }
});


module.exports = profileRouter;