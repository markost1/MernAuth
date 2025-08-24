import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { handleError } from "../utils/error.js";
import jwt from 'jsonwebtoken';
import generateVertificationToken from "../utils/generateVertificationToken.js";
import { sendVertificationEmail } from "../mailtrap/emails.js";

export const signup = async (req,res,next) =>{
     try {
        const {username,email,password} = req.body; 
        if(!username || !email || !password){
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
            vertificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
        })
        await newUser.save()

        await sendVertificationEmail(newUser.email, vertificationToken);
       
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