import usersSchema, {User} from "../models/users.models";
import { Response, Request } from "express";


export const createUser:any = async(req: Request, res: Response) => {
    let newUser: User = {
        name: req.body.name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
    };
    try{
        await usersSchema.create(newUser);
        res.status(200).json({message: "User created"});
    }catch(e){
        res.status(400).json({message: "User could not be created"});
        console.error(e);
    }
};

export const getUsers:any = async(req: Request, res: Response) => {
    try{
        const query:any = await usersSchema.find();
        res.status(200).json(query);
    }catch(e){
        res.status(400).json({message: "Users can not be consulted"});
        console.error(e);
    }
};

export const getUser: any = async(req: Request, res: Response) => {
    try{
        const query:any = await usersSchema.findOne({email: req.params.userID});
        res.status(200).json(query);
        console.log("consulting one");
    }catch(e){
        res.status(400).json({message: "Users can not be consulted"});
        console.error(e);
    }
};

export const updateUser: any = async(req: Request, res: Response) => {
    let updateUser: User = {
        name: req.body.name,
        last_name: req.body.last_name,
        birthdate: req.body.birthdate,
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password
    };
    try{
        await usersSchema.findOneAndUpdate({email: req.body.email}, updateUser);
        res.status(200).json({message: "User modified"});
    }catch(e){
        console.error(e);
        res.status(400).json({message: "User can not be modified"});

    }
};

export const deleateUser: any = async(req: Request, res: Response) => {
    try{
        await usersSchema.findOneAndDelete({email: req.params.userID});
        res.status(200).json({message: "User deleted"});
    }catch(e){
        res.status(400).json({message: "User could not be deleted"});
        console.error(e);
    }
};