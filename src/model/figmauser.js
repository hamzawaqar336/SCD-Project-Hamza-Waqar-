const mon=require("mongoose");
const validator=require("validator");
const jwt=require("jsonwebtoken");
const userSchema = new mon.Schema({
    Fullname:{
        type:String,
        required:true,
        minlength:2,
        maxlength:30,

    },
    email:{
        type:String,
        unique:[true,"This Email is already available"],
        required:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new  Error ("invalid email")
            }
    }      
    },
    phone:{
        type:Number,
        minlength:10,
        maxlength:11,
        required:true
    },
    active:{
        type:String

    },


});

userSchema.methods.generateAuthToken =async function (){
    try{
       const tokeno=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
       this.tokens=this.tokens.concat({token:tokeno})
       await this.save();
       return tokeno;
       
    }catch(err){
        console.log(err)
    }
    }

const Figma =new mon.model("Figma",userSchema);

module.exports = Figma;