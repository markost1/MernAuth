import express from 'express'
import { signin, signout, signup, verifyEmail, resendVertificationToken } from '../controllers/auth.controllers.js';

const router = express.Router()


router.post('/signup',signup)
router.post('/signin', signin)
router.post('/signout', signout)
router.post('/verify-email', verifyEmail)
router.post('/resend-token', resendVertificationToken)




export default router;