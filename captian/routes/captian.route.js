import { Router } from 'express'
import {  register,login,logout,profile, updateAvailability,acceptRide } from '../controller/captian.controller.js';
import { authMiddleware } from '../middleware/authorization.js';

const captianRoute = Router( )

captianRoute.post('/register',register)
captianRoute.post('/login',login)
captianRoute.get('/logout',authMiddleware,logout)
captianRoute.get('/profile/:id', authMiddleware, profile); 
captianRoute.patch('/captians/:id',authMiddleware,updateAvailability)
captianRoute.post('/captians/:id/accept-ride', authMiddleware, acceptRide);

export default captianRoute;
