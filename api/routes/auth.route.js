import express from 'express'
import { signin,
     signout,
     signup,
     verifyEmail,
     resendVertificationToken,
     forgotPassword,
     resetPassword } from '../controllers/auth.controllers.js';
import { verifyToken } from '../utils/verifyToken.js';


const router = express.Router()


router.post('/signup',signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/verify-email',verifyToken,verifyEmail)
router.post('/resend-token',verifyToken, resendVertificationToken)
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)




export default router;