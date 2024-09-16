import express from 'express';
import {adminLogin,userDetails,deleteUser,updateUser, addNewUser} from '../controller/adminController.js'
const routes = express.Router();


routes.post('/login',adminLogin);
routes.get('/user', userDetails);
routes.post('/add-user',addNewUser)
routes.delete('/delete-user/:id', deleteUser);
routes.put('/edit-user/:id', updateUser);

export default routes;