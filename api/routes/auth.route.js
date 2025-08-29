import express from 'express'
import { signin, signout, signup, verifyEmail, resendVertificationToken,forgetPassword } from '../controllers/auth.controllers.js';

const router = express.Router()


router.post('/signup',signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/verify-email', verifyEmail)
router.post('/resend-token', resendVertificationToken)
router.post('/forget-password', forgetPassword)




export default router;