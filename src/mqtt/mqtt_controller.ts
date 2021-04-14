import mqtt from "mqtt";

class MqttHandler {
    mqttClient: any;
    host: any;
    user_name: any;
    password: any;
    
    constructor() {
        this.mqttClient = null;
        this.host = 'mqtt://localhost',
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
            console.log('mqtt client connected');
        });

        this.mqttClient.subscribe('test', {qos: 0});
        
        this.mqttClient.on('message', (topic: any, message: any) =>{
            console.log(message.toString());
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