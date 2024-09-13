import express from 'express';
import { userLoginRender,updateUser } from '../controller/userController.js';
import { verifyToken } from '../utils/userVerify.js';

const router = express.Router();


router.get('/', userLoginRender);
router.post('/update-profile/:id',verifyToken,updateUser);


export default router;