import express, { Router } from "express";
import { createSensor, deleteSensor, getSensor, getSensors, updateSensor } from "../controllers/sensors.controllers";
import {verifyToken} from "../middlewares/auth";

export const sensorRouter:Router = express.Router();

sensorRouter.post('/', [verifyToken], createSensor);
sensorRouter.get('/', [verifyToken], getSensors);
sensorRouter.get('/:sensorID', [verifyToken], getSensor);
sensorRouter.delete('/:sensorID', [verifyToken], deleteSensor);
sensorRouter.patch('/', [verifyToken], updateSensor);