import express from 'express';
import {adminLogin,userDetails} from '../controller/adminController.js'
const routes = express.Router();


routes.post('/login',adminLogin);
routes.get('/user',userDetails);

export default routes;