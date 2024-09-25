const express = require('express');
const app = express();

const {adminAuth}=require("./middlewares/auth")


app.get("/", (req, res) => {
    res.send("Hello from dashboard");
});
app.use("/admin",adminAuth)
// app.get('/user', (req, res) => {
//     res.send({first_name:"vraj jangid", last_name:"jangid"});
// });


app.get("/admin/getData",(req,res)=>{
    res.send("All data is printed");
})
app.get("/admin/deleteData",(req,res)=>{
    res.send("deleted a user");
})


app.get("/user", (req, res,next) => {
    next();
   res.send("Hello from dashboard");
   
},(req, res) => {
    res.send("Hello from dashboard 2");
},);


app.post("/user", (req, res) => {
    res.send("Data Added Successfully");
});
app.delete("/user", (req, res) => {
    res.send("Data Deleted Successfully");
});

app.listen(7000, () => {
    console.log("Server started on port 7000!");
});
