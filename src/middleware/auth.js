const jwt=require("jsonwebtoken");
const Figma=require("../src/model/figmauser");


const auth=async (req,res,next)=>{
    try{
    const token=req.cookies.jwt;
    const verification=jwt.verify(token,process.env.SECRET_KEY);
    console.log(verification);
    const user=await Figma.findOne({_id:verification._id});
    console.log(user);
    req.token=token;
    req.user=user;
    next();
    }
    catch(error){
        res.status(404).send("you are not validate user")
        console.log(error);
    }
}
module.exports = auth;