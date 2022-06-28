const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const joi=require('joi');
const passwordComplexity=require('joi-password-complexity');

//creating schema('outline of db')
const userSchema=new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
});

//Generating Auth token
userSchema.methods.generateAuthToken = function(){
    const token=jwt.sign({_id:this._id},process.env.JWTPRIVATEKEY,{expiresIn:"7D"})
    return token
};

//USER MODEL
const User=mongoose.model("user",userSchema);

//Validation function
const validate=(data)=>{
    const schema=joi.object({
        firstName:joi.string().required().label("First Name"),
        lastName:joi.string().required().label("Last Name"),
        email:joi.string().email().required().label("Email"),
        password:passwordComplexity().required().label("Password"),
    });
    return schema.validate(data);
};

module.exports={User,validate};