import mongoose from "mongoose";
import sensorsSchema, { Sensor, reading } from "../models/sensors.models";
import productsSchema from "../models/products.models";
import userSchema from "../models/users.models";

import { Response, Request } from "express";

export const createSensor: any = async (req: Request, res: Response) => {
    const newSensor: Sensor = {
        sensorID: new mongoose.Types.ObjectId(),
        sensor_name: req.body.sensor_name,
        productID: req.body.productID
    };
    try{
        await sensorsSchema.create(newSensor);
        res.status(200).json({message: "Sensor created", newSensor});
    }catch(e){
        res.status(400).json({message: "Sensor could not be created"});
        console.error(e);
    }
}

export const getSensor: any = async (req: Request, res: Response) => {
    try{
        const query:any = await sensorsSchema.findById({_id: req.params.sensorID});
        res.status(200).json(query);
        console.log("consulting one");
    }catch(e){
        res.status(400).json({message: "Sensor can not be consulted"});
        console.error(e);
    }
}

export const getSensors: any = async (req: Request, res: Response) => {
    try{
        const query:any = await sensorsSchema.find();
        res.status(200).json(query);
    }catch(e){
        res.status(400).json({message: "Sensors could not be consulted"});
        console.error(e);
    }
}

export const deleteSensor: any = async (req: Request, res: Response) => {
    try{
        await sensorsSchema.findByIdAndDelete({_id: req.params.sensorID});
        res.status(200).json({message: "Sensor deleted"});
    }catch(e){
        res.status(400).json({message: "Sensor could not be deleted"});
        console.error(e);
    }
}

export const updateSensor: any = async (req: Request, res: Response) => {
    let updateProduct: Sensor = {
        sensor_name: req.body.sensorName
    };
    try{
        await sensorsSchema.findByIdAndUpdate({_id: req.body.productID}, updateProduct);
        res.status(200).json({message: "Sensor modified"});
    }catch(e){
        console.error(e);
        res.status(400).json({message: "Sensor can not be modified"});

    }
}

export const onMessage: any = async (msg: any) => {
        const result:any =  await sensorsSchema.findOne({productID: msg.productID, sensor_name: msg.s1.sensor_name});
        result.readings.push({value: msg.s1.value});
        await sensorsSchema.findOneAndUpdate({_id: result._id}, result);
        const userid:any =  await sensorsSchema.findOne({_id: result._id}).populate('productID').exec();
        const socketid: any =  await productsSchema.findOne({_id: userid.productID}).populate('userID').exec()
        //console.log(socketid.userID.socket_id);
        return socketid.userID.socket_id;
        //return socketid.userID.socket_id;

}
   