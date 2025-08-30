import express from 'express'
import { signin,
     signout,
     signup,
     verifyEmail,
     resendVertificationToken,
     forgetPassword,
     resetPassword } from '../controllers/auth.controllers.js';

const router = express.Router()


router.post('/signup',signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/verify-email', verifyEmail)
router.post('/resend-token', resendVertificationToken)
router.post('/forget-password', forgetPassword)
router.post('/reset-password/:token',resetPassword)




export default router;