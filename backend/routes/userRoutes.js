import express from 'express';
import { userLoginRender } from '../controller/userController.js';

const router = express.Router();


router.get('/', userLoginRender)


export default router;