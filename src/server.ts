import express, { Application, Response, Request } from "express";
import socketio, { Server, Socket } from "socket.io";
import morgan from "morgan";
import path from "path";
import MqttHandler from "./mqtt/mqtt_controller";
import { userRouter } from "./routes/user.routes";
import { Database } from "./config/mongo";

// MQTT
const mqttClient: MqttHandler = new MqttHandler();
mqttClient.connect();

// Initializations
const app: Application = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Settings
app.set('port', 3000);
const database = Database();


// Middlewares
app.use(morgan('dev'));
app.use(express.json()); //Used to parse JSON bodies

// Routes
app.use('/user', userRouter);
// app.use('/', routes);
app.post("/send-mqtt", (req: Request, res: Response) => {
    mqttClient.sendMessage(req.body.message);
    res.status(200).send("Message sent to mqtt");
})

app.get('/', function(req, res) {
   res.sendFile('/home/diego-oseguera/Escritorio/Tesis/be/src/index.html');
   console.log(__dirname, '/index.html');
    //res.status(200).send('Hola');
 });
 

io.on('connection', (socket: any) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

// Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the Server
// app.listen(app.get('port'), ()=> {});
http.listen(3000, function() {
  console.log('listening on *:3000');
});

// import express, {Request, Response } from "express";

// const app = require('express')();
// const http = require('http').Server(app);

// app.get('/', function(req: Request, res: Response) {
//    res.status(200).send("Holaaaaa");
// });
// module
// http.listen(3000, function() {
//    console.log('listening on *:3000');
// });