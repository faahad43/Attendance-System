import express from 'express'
import { Login,Logout,Signup,adminLogin } from '../Controllers/authController.js';

const router = express.Router();

router.post('/login',Login);
router.post('/signup',Signup);
router.post('/logout',Logout);
router.post('/admin-login',adminLogin)

export default router