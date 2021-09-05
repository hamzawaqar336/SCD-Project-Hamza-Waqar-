//CURD OPERATION>>>
const express=require("express");
const app=express();
const cookieParser=require("cookie-parser");
const port=process.env.PORT || 8000;
const Figma=require("../src/model/figmauser");
const auth=require("./middleware/auth");
require("./db/conn");
app.use(express.json());

//CREATE AND INSERTION API POST REQ OF DATA TESTED ON POSTMAN BY HAMZA WAQAR!!! 
app.post("/figmauser",auth,(req,res)=>{
    const user = new Figma(req.body);
    const token= await registerUser.generateAuthToken();
    res.cookie("jwt",token);
   
    user.save().then(()=>{
        res.status(201).send(user)
    }).catch((err)=>{
        res.status(404).send(err)
    })
})

// READ DATA FROM DB BY CREATING API OF IT GET
//now this time i will do it with async await..
app.get("/figmauser",async (req,res)=>{
   try{
    const result=await Figma.find();
    res.send(result)
   }catch(err){
         res.send(err);
   }
})
//API FOR GETTING INDIVIUAL USER DATA>>>

app.get("/figmauser/:id",async (req,res)=>{
   try{
       const _id=req.params.id;
     const result=await Figma.findById(_id);
     if(!result){
        return res.status(404).send();
     }else{
         res.send(result);
     }
     res.send(result)
   }catch(err){
        res.send(err)
   }
})

//DELETE API >>
app.delete("/figmauser/:id",auth,async (req,res)=>{
try{
    const id=req.params.id;
    req.user.tokens=req.user.tokens.filter((elem)=>{
          return elem.token !== req.token;
    })
    res.clearCookie("jwt");
    await req.user.save();
    res.render("your cookie is deleted")
    const result =await Figma.findByIdAndDelete(id);
    res.send("your this data is deleted" +result);
}catch(err){
    res.send(err)
}
})

//UPDATE USER API>>
app.patch("figmauser/:id",auth,async (req,res)=>{
   try{

       const id=req.params.id;
       
        const token= await registerUser.generateAuthToken();
        res.cookie("jwt",token);
       const result=await Figma.findByIdAndUpdate(id,req.body,{
           new:true
       });
       res.send(result);
    }catch(err){
        res.status(404).send(err)
    }

})

app.listen(port,()=>{
    console.log("server is running")
})