import express, { Router } from "express";
import { createUser, deleateUser, getUser, getUsers, updateUser } from "../controllers/users.controllers";

export const userRouter:Router = express.Router();

userRouter.post('/', createUser);
userRouter.get('/', getUsers);
userRouter.get('/:userID', getUser);
userRouter.delete('/:userID', deleateUser);
userRouter.patch('/', updateUser);