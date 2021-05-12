import express, { Router } from "express";
import { createUser, deleateUser, getUser, getUsers, loginUser, updateUser } from "../controllers/users.controllers";
import {verifyToken} from "../middlewares/auth";

export const userRouter:Router = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', [verifyToken], getUsers);
userRouter.get('/:userID', [verifyToken], getUser);
userRouter.delete('/:userID', [verifyToken], deleateUser);
userRouter.patch('/', [verifyToken], updateUser);
userRouter.post('/login',loginUser);