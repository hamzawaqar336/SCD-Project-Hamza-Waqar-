const mon=require("mongoose");

mon.connect("mongodb://localhost:27017/employee").then(()=>{
    console.log("con success")
}).catch((err)=>{
    console.log(err);
});