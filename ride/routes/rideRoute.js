import express from 'express'
const rideRoute = express.Router();
import {createRide} from '../controllers/ride.controller.js'
import { authenticateUser } from '../middlewares/auth.middleware.js';

rideRoute.post('/create/:id',authenticateUser, createRide);

export default rideRoute ;
