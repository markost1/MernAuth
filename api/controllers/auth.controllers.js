import bcrypt from "bcryptjs"
import User from "../models/user.model.js"

export const signup = async (req,res,next) =>{
    const {username,email,password} = req.body;

    const hashPassword = bcrypt.hashSync(password,10)


    const newUser = await User({username,email,password:hashPassword})

    try {
        await newUser.save()
        res.status(200).json("user is succesfully saved in DB")
    } catch (error) {
        res.status(500).json("Server error")
        
    }

    

    
    
    
}