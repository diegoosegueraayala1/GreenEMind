import { verify } from "jsonwebtoken";
import {keys} from "../config/keys";
import {Request, Response, NextFunction} from "express"

 //Authorization: Bearer <token>
export const verifyToken:any = async (req: Request, res: Response, next: NextFunction) => {
    try{
        
        if(!req.headers.authorization){
           res.status(401).json({message: "No token provided"});
        }else{
            let token = req.headers.authorization.split(' ')[1];
            if(verify(token, keys.SECRET_KEY)){
                const decoded = verify(token, keys.SECRET_KEY);
                next();
            }else{
                res.status(400).json({message: "Invalid Token"});
            }
        }  
    }catch(err){
        return res.status(401).json({message: "Unaothorized"});
    }
 }