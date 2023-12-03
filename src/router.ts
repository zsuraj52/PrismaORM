import express from 'express';
import { createUserController, getAllUsersController, getUserByIdController, updateUserById, deleteUserByIdController } from './controller/user.controller';

const router = express.Router();

router.post('/create/user' , createUserController);
router.get('/get/allUsers' , getAllUsersController);
router.get('/get/user/:userId' , getUserByIdController);
router.put('/update/user/:userId', updateUserById);
router.delete('/delete/user/:userId', deleteUserByIdController )

export default router; 