const mongoose= require("mongoose");

const connectDB= async()=>{
    await mongoose.connect("mongodb+srv://vrajjangid5:6bpy69VwBUzJuNEi@cluster.rz95go2.mongodb.net/devSwipe");
}
module.exports=connectDB;
