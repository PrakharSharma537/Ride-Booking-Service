import { Router } from 'express'
import {  register,login,logout,profile } from '../controller/user.controller.js';
import { authMiddleware } from '../middleware/authorization.js';

const userRoute = Router( )

userRoute.post('/register',register)
userRoute.post('/login',login)
userRoute.get('/logout',authMiddleware,logout)
userRoute.get('/profile/:id',authMiddleware,profile)
export default userRoute;
