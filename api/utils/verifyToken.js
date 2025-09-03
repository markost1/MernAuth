import jwt from 'jsonwebtoken'
import { handleError } from './error.js';



export const verifyToken = (req,res,next) => {
  const token = req.cookies?.access_token || req.headers.authorization?.split(' ')[1];
  //const token = req.cookies.access_token;
  if(!token) return next(handleError(403,"Invalid or expired token"))

    jwt.verify(token, process.env.JWT_SECRET,(err,user)=>{
        if(err) return next(handleError(403,'Forbidden'))
        req.user = user
        next()
    })
}
