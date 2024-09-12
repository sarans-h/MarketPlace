const mongoose = require("mongoose");
const validator=require("validator");
const bcrypt = require('bcryptjs');
const jwt=require("jsonwebtoken")
const crypto=require('crypto')//builtin
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"],
        maxLength:[30,"Name should not exceed 30 characters"],
        minLength:[4,"Name should be greater than 4 characters"],
    },
    email:{
        type:String,
        required:[true,"Please enter your email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false //beacuse whenever it is acceswsed ie using find this field wil not go
    },
    avatar:{
         public_id:{
             type:String,
             required:true,
         },
         url:{
             type:String,
             required:true,
         },
    },
    role:{
        type:String,
        default:"user"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,

    


})

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password=await bcrypt.hash(this.password,10)
})
// Jwt Token
userSchema.methods.getJWTToken = function () {
   
    
return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn:process.env.JWT_EXPIRE,
});
}
userSchema.methods.comparePassword = async function (password) {
    // console.log(await bcrypt.compare(password, this.password));
    
    return await bcrypt.compare(password, this.password);
  };
// generating password reset token
userSchema.methods.getResetPasswordToken = function () {
    // generating token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // hash and add to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');//sha256 is algorithm to create hash
    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    return resetToken;

}

module.exports=mongoose.model("User",userSchema);