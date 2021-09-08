const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
require("./db/conn");
const Employee=require("./model/user");
const hbs=require("hbs");
const path=require("path");
app.set("view engine","hbs");
app.set("views","./template/views")
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/registeration",(req,res)=>{
    res.render("registeration");
});


app.post("/registeration",async (req,res)=>{
    try{ 
     const rU = new Employee({
        name:req.body.username,
        phone:req.body.userphone,
        email:req.body.useremail,
        age:req.body.userage               

     })

    const token=await rU.generateAuthToken();
    res.cookie("jwt",token,{});

     const result = await rU.save();
     res.status(201).render("login");
    }
    
    
    catch(err){
        console.log(err)
    }
})

app.listen(8000,()=>{
    console.log("server is running");

})

