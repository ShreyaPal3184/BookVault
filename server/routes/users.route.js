import express from "express";
import * as userController from "../controller/users.controller.js";

const router = express.Router();

router.get('/get', userController.getUsers);
router.get('/get/:id', userController.getUserById);
router.post('/register', userController.createUser);
router.put('/update/:id', userController.updateUser);
router.delete('/delete/:id', userController.deleteUser);
router.post('/login', userController.login);

export default router;