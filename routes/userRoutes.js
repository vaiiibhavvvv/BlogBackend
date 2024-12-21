import express from 'express';
import {login,getUserDetails,userRegister} from '../controller/userController'
import { authorization } from '../middleware/authMiddleware';

export const router = express.Router();

// User API
router.post('/register',userRegister);
router.post('/login',login);
router.get('/profile',authorization,getUserDetails);


