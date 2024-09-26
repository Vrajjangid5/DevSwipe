const express = require('express');
const app = express();
const connectDB=require("./config/database")
const User = require("./models/user")
app.use(express.json())

// const {adminAuth,userAuth}=require("./middlewares/auth")


// app.get("/", (req, res) => {
//     res.send("Hello from dashboard");
// });
// app.use("/admin",adminAuth)
// // app.get('/user', (req, res) => {
// //     res.send({first_name:"vraj jangid", last_name:"jangid"});
// // });


// app.get("/admin/getData",(req,res)=>{
//     res.send("All data is printed");
// })
// app.get("/admin/deleteData",(req,res)=>{
//     res.send("deleted a user");
// })


// app.get("/user", userAuth,(req, res) => {
//     res.send("Hello this is user");
// },);


// app.post("/user", (req, res) => {
//     res.send("Data Added Successfully");
// });
// app.delete("/user", (req, res) => {
//     res.send("Data Deleted Successfully");
// });

app.get("/user", async(req, res) => {
    try{
        const users= await User.find({email:req.body.email});
        if(users===0){
            res.status(404).send("user Not Found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something Went Wrong");
    }
});
//delete the data
app.delete("/user",async(req,res)=>{
    try{
        const userId=req.body.userId;
        const users= await User.findByIdAndDelete(userId);
        if(users===0){
            res.status(404).send("user Not Found");
        }else{
            res.send(" deleted succes");
        }
    }catch(err){
        res.status(400).send("something Went Wrond");
    }
})

//update the data 
//patch and put 

    app.patch("/user", async (req, res) => {
        try {
            const userId = req.body.userId;
            const data = req.body;
    
            const isAllowed = ["userId", "firstName", "gender", "lastName", "password", "skill"];
            const isUpdatedAllowed = Object.keys(data).every((k) => isAllowed.includes(k));
    
            if (!isUpdatedAllowed) {
                return res.status(400).send({ error: "Update not allowed for these fields" });
            }
    
            // Check if skill is provided and if its length is valid
            if (data?.skill && data.skill.length > 10) {
                return res.status(400).send({ error: "Skill cannot be more than 10 items" });
            }
    
            const user = await User.findByIdAndUpdate(userId, data, {
                runValidators: true,
                new: true // This returns the updated document
            });
    
            // Handle case where no user is found
            if (!user) {
                return res.status(404).send({ error: "User not found" });
            }
    
            res.send({ message: "Data updated successfully", user });
        } catch (err) {
            // Send a more detailed error message
            res.status(500).send({ error: "Something went wrong", details: err.message });
        }
    });
    


app.get("/feed", async(req, res) => {
    try{
        const users= await User.find({});
        if(users===0){
            res.status(404).send("user Not Found");
        }else{
            res.send(users);
        }
    }catch(err){
        res.status(400).send("Something Went Wrong");
    }
});




app.post("/signup",async(req,res)=>{
    // console.log(req.body);
    // const userData={
    //     firstName:"vraj",
    //     lastName:"Jangid",
    //     email:"vrajjangid5@gmail.com",

    //     age:20,
    //     gender:"male",
    // }
    try{
        const user =new User(req.body);
        await user.save();
        res.send("user Added SuccessFully");
    }catch(err){
        res.status(400).send({ message: 'An error occurred' });
    }
})

connectDB().then(()=>{
    console.log("dataBase Connect Successful")
    app.listen(7000, () => {
        console.log("Server started on port 7000!");
    });
}).catch(err=>{
    console.log("error Occure");
})


