const adminAuth=(req,res,next)=>{
    const token="xyz";
    const isAdmin=token==="xyz";
    if(!isAdmin){
        res.status(404).send("Unauthrize User")
    }else{
        next();
    }

}

module.exports={
    adminAuth,
}