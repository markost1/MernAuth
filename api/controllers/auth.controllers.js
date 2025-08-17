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


export const signin = async(req,res,next)=>{
    const {email,password} = req.body;

    try {
        const validUser = await User.findOne({email})
        if(!validUser) return next(handleError(401,'Invalid Email'))

        const validPassword = await bcrypt.compare(password,validUser.password);
        if(!validPassword) return next(handleError(401,'Invalid Password'))

        const {password:pass, ...rest} = validUser._doc;

        res.status(200).json(rest)
        
    } catch (error) {
        next(handleError(500,'Internal Server Error'))
    }
}