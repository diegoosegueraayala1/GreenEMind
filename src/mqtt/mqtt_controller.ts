import mqtt from "mqtt";
import {onMessage} from "../controllers/sensors.controllers";
import usersSchema from "../models/users.models";
import {io} from "../server";

class MqttHandler {
    mqttClient: any;
    host: any;
    user_name: any;
    password: any;
    num = 0;
    
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

        this.mqttClient.subscribe('GEM', {qos: 0});
        
        this.mqttClient.on('message', async (topic: any, message: any) =>{
            
            const words = ['Buenos días.','¡Apenas acabo de despertarme...!', 'Estoy toda despeinada', '¡He nacido al mismo tiempo que el Sol!', 'Creo que es la hora del desayuno', '¿Puedes traerme el desayuno?', '¿Podrías ponerme algún biombo por la noche para que el frío no moleste?', 'Te quiero', 'Prefiero que vengan las orugas. Si no.. ¿cómo conoceré a las mariposas?', '¿Hay tigres en tu planeta?. No temo a los tigres, pero me dan miedo las corrientes de aire', '¡Hay una serpiente en mi bota!', 'Solo eres un juguete', 'Juega bonito Sid.'];
            //console.log(message.toString());
            //let msg = '{"productID": "608dea239f78590add47ce24", "s1": {"sensor_name": "Temperatura", "value": "20"}}';
            let msg = JSON.parse(message.toString());
            const user: String = await onMessage(msg);
            if(this.num === words.length ){
                this.num = 0;
            }
            //console.log(user);
            //io.sockets._events.messageReceiver(io,'pZeCudJYb9CtMghZAAAB', msg);
            io.sockets._events.messageReceiver(io,user, words[this.num]);
            //console.log('Hola ', msg);
            this.num = this.num +1;
        });

        this.mqttClient.on('close', () => {
            console.log('mqtt client disconnected');
        });
    }

    public sendMessage(message: any): any {
        this.mqttClient.publish('GEM', message);
    }
}

export default MqttHandler;