import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        
    },
    lastLogin:{
        type:Date,
        default:Date.now()
    },
    isVerify:{
        type:Boolean,
        default:false,
    },
    resetPasswordToken:String,
    resetPasswordExpiresAt:Date,
    vertificationToken:String,
    vertificationTokenExpiresAt:Date,

},{ timestamps: true});


const User = mongoose.model('User',userSchema);

export default User;