import express from 'express';
import { userLoginRender,updateUser,signOut } from '../controller/userController.js';
import { verifyToken } from '../utils/userVerify.js';

const router = express.Router();


router.get('/', userLoginRender);
router.post('/update-profile/:id',verifyToken,updateUser);
router.get('/signout',signOut);


export default router;