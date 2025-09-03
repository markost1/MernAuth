import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { handleError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import generateVertificationToken from "../utils/generateVertificationToken.js";
import crypto from 'crypto';
import { sendPasswordResetEmail,
         sendPasswordResetSuccessEmail,
         sendVertificationEmail,
         sendWelcomeMail } from "../mailtrap/emails.js";

export const signup = async (req,res,next) =>{
     try {
        const {username,email,password} = req.body; 
        if(!username || !email || !password || (!username && !email && !password)){
            return next(handleError(400, 'All fields are required'))
        }

        const userExist = await User.findOne({email})
        if(userExist){
           return next(handleError(409,"Email is already in use"))
        }

        const hashPassword = bcrypt.hashSync(password,10)
        const vertificationToken = generateVertificationToken() 

        
        
        const newUser = new User({
            username,
            email,
            password:hashPassword,
            vertificationToken,
            vertificationTokenExpiresAt:Date.now() + 1 * 60 * 1000,
        })
        await newUser.save()

        //await sendVertificationEmail(newUser.email, vertificationToken);
       
        res.status(201).json({
            success:true,
            message:"User registered successfully"
        })

    } catch (error) {
        next(handleError(500,error.message))
        
    }  
    
}


export const signin = async(req,res,next)=>{
    const {email,password} = req.body;

    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(handleError(401,'Invalid Email'))

        const validPassword = await bcrypt.compare(password,validUser.password);
        if(!validPassword) return next(handleError(401,'Invalid Password'))

        const token = jwt.sign({id:validUser._id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        )

        const {password:pass, ...rest} = validUser._doc;

        res.cookie('access_token',token,{
            httpOnly:true,
            sameSite: 'strict',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)  
            }).status(200).json(rest)
        
    } catch (error) {
        next(handleError(500,'Internal Server Error'))
    }
}

export const signout = (req,res,next) =>{
    try {
        res.clearCookie('access_token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:"strict"
        })
        
        res.status(200).json({message:'User is successfully signed out'})
        
    } catch (error) {
        console.error("Sign out error:", error);
        res.status(500).json({ message: "Server error during sign out" });
    }
}


export const verifyEmail = async ( req,res,next ) =>{
    const {code} = req.body;

    try {
        const user = await User.findOne({
            vertificationToken:code,
            vertificationTokenExpiresAt:{$gt:Date.now()},
        })

        if(!user){
            return next(handleError(400,'Verification code is invalid or has expired. Please request a new one.'))
        }

        user.isVerify = true;
        user.vertificationToken = undefined;
        user.vertificationTokenExpiresAt = undefined;

        await user.save();

        await sendWelcomeMail(user.email, user.username);

        res.status(200).json({
            success:true,
            message:"Email is successfully verified",
            user:{
                ...user._doc,
                password:undefined,
            }
            

        })

    } catch (error) {
        next(handleError(500, 'Internal Server Error'));
        
    }

}

export const resendVertificationToken = async(req,res,next) =>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return next(handleError(404,'User not found'))
        }
        if(user.isVerify){
            return next(handleError(400,'Acount is already verified'))
        }
        const newToken = generateVertificationToken();
        user.vertificationToken = newToken
        user.vertificationTokenExpiresAt = Date.now() + 1 * 60 * 1000

        await user.save();

       // await sendVertificationEmail(user.email, newToken)

        res.status(200).json({
            success:true,
            message:'A new vertification code has been send to your email.',
        })

    } catch (error) {
        next(handleError(500,'Something went wrong, please try again later'))
    }
}

export const forgotPassword = async(req,res,next)=>{
    const {email} = req.body;
    try {
        const user = await User.findOne({email})
        if(!user){
            return next(handleError(400,"If an account with this email exists, a password reset link has been sent."))
        }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const resetTokenExpireAt = Date.now() + 1 * 60 * 60 * 1000

        user.resetPasswordToken= resetToken;
        user.resetPasswordExpiresAt=resetTokenExpireAt;

    await user.save();

    sendPasswordResetEmail(user.email, `${process.env.RESET_EMAIL_URL}/reset-password/${resetToken}`)

    res.status(200).json({
        success:true,
        message:"Password reset link send to your email",
        
    })


    } catch (error) {
        console.log(error);
        
    }
}

export const resetPassword = async(req,res,next) => {

    const {token} = req.params;
    const {newPassword} = req.body;

    try {
        const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpiresAt: {$gt:Date.now()}
    })

    if(!user){
        return next(handleError(401,'Invalid or expired reset token'))
    }

    const hashedPassword = bcrypt.hashSync(newPassword,10)

    user.password = hashedPassword;
    user.resetPasswordToken= undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    sendPasswordResetSuccessEmail(user.email)

    res.status(201).json({
        success:true,
        message:'Password is successfully changed',
    })

    } catch (error) {
       
        console.log(error.message);
        
        res.status(404).json({
            success:false,
            message:error.message,
        })
    }

    


}