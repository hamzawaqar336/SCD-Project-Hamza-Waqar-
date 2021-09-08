const mon =require("mongoose");
const jwt=require("jsonwebtoken");

const empData=new mon.Schema({
    name:{type:String},
    phone:{type:Number},
    email:{type:String},
    age:{type:Number},
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

// empData.methods.generateAuthToken=async function (){
//     try{
//        const tokeno=await jwt.sign({_id:this._id},"thisismyjwttokenkeytoauthenticatejwtbutnotnoauth");
//        this.tokens=this.tokens.concat({token:tokeno});
//        await this.save();
//        return tokeno;
//     }
//     catch(err){
//         console.log(err)
//     }
// }
empData.methods.generateAuthToken = async function (){
    try{
        const tokeno=await jwt.sign({_id:this._id},"msaiashoisajdoisajdsandandalsdioaidwiiwdninicsin");
     this.tokens=this.tokens.concat({token:tokeno});
     await this.save();
     return tokeno;
    }catch(err){
        console.log(err)
    }
}

const Employee=new mon.model("Employee",empData);

module.exports = Employee;