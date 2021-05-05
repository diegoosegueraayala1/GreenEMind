import productsSchema, { Product } from "../models/products.models";
import { Response, Request } from "express";

export const createProduct: any = async (req: Request, res: Response) => {
    const newProduct: Product = {
        registration_date: new Date(),
        nickname: req.body.nickname,
        status: req.body.status,
        userID: req.body.userID
    };
    try{
        const result: any = await productsSchema.create(newProduct);
        res.status(200).json({message: "Product created", result});
    }catch(e){
        res.status(400).json({message: "Product could not be created"});
        console.error(e);
    }
}

export const getProduct: any = async (req: Request, res: Response) => {
    try{
        const query:any = await productsSchema.findById({_id: req.params.productID});
        res.status(200).json(query);
        console.log("consulting one");
    }catch(e){
        res.status(400).json({message: "Product can not be consulted"});
        console.error(e);
    }

}

export const getProducts: any = async (req: Request, res: Response) => {
    try{
        const query:any = await productsSchema.find();
        res.status(200).json(query);
    }catch(e){
        res.status(400).json({message: "Products could not be consulted"});
        console.error(e);
    }
}

export const deleteProducts: any = async (req: Request, res: Response) => {
    try{
        await productsSchema.findByIdAndDelete({_id: req.params.productID});
        res.status(200).json({message: "Product deleted"});
    }catch(e){
        res.status(400).json({message: "Product could not be deleted"});
        console.error(e);
    }
}

export const updateProduct: any = async (req: Request, res: Response) => {
    let updateProduct: Product = {
        registration_date: new Date(),
        nickname: req.body.nickname,
        status: req.body.status,
        userID: req.body.userID
    };
    try{
        await productsSchema.findByIdAndUpdate({_id: req.body.productID}, updateProduct);
        res.status(200).json({message: "Product modified"});
    }catch(e){
        console.error(e);
        res.status(400).json({message: "Product can not be modified"});

    }
}