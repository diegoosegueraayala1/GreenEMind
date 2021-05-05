import mqtt from "mqtt";
import {onMessage} from "../controllers/sensors.controllers";
import usersSchema from "../models/users.models";
import {io} from "../server";

class MqttHandler {
    mqttClient: any;
    host: any;
    user_name: any;
    password: any;
    
    constructor() {
        this.mqttClient = null;
        this.host = 'mqtt://20.97.9.143',
        this.user_name = '',
        this.password = ''
    }

    public connect(): any {
        this.mqttClient = mqtt.connect(this.host, { username: this.user_name, password: this.password});

        this.mqttClient.on('error', (err: any) => {
            console.log(err);
            this.mqttClient.end();
        });

        this.mqttClient.on('connect', () => {
            console.log('mqtt client connected today');
        });

        this.mqttClient.subscribe('test', {qos: 0});
        
        this.mqttClient.on('message', async (topic: any, message: any) =>{
            let msg = '{"productID": "608dea239f78590add47ce24", "s1": {"sensor_name": "Temperatura", "value": "20"}}';
            msg = JSON.parse(msg);
            const user: String = await onMessage(msg);
            console.log(user);
            io.sockets._events.messageReceiver(io,user, msg);
        });

        this.mqttClient.on('close', () => {
            console.log('mqtt client disconnected');
        });
    }

    public sendMessage(message: any): any {
        this.mqttClient.publish('test', message);
    }
}

export default MqttHandler;