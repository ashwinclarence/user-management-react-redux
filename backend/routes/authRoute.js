import express from 'express';
import { signIn } from '../controller/authController.js';

const router = express.Router();


router.post('/sign-in', signIn);


export default router;