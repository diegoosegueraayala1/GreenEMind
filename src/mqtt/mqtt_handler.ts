import mqtt from "mqtt";

const client = mqtt.connect('mqtt://localhost');

client.on('connect', () => {
    client.subscribe('test');
    client.publish('test', 'Hello MQTT sent from Express');
});

client.on('message', (topic, message) => {
 //Message is Buffer
 console.log(message.toString());
 client.end();
});
