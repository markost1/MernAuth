import bcrypt from "bcryptjs"
import User from "../models/user.model.js"
import { handleError } from "../utils/error.js";

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
        
        const newUser = new User({username,email,password:hashPassword})
        await newUser.save()
       
        res.status(201).json({
            success:true,
            message:"User registered successfully"
        })

    } catch (error) {
        next(handleError(500,error.message))
        
    }  
    
}