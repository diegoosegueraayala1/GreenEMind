import express, { Application, Response, Request } from "express";
import {verify} from "jsonwebtoken";
import morgan from "morgan";
import path from "path";
import cors from 'cors';
import {keys} from "./config/keys";
import MqttHandler from "./mqtt/mqtt_controller";
import { userRouter } from "./routes/user.routes";
import { productRouter } from "./routes/products.routes";
import { sensorRouter } from "./routes/sensors.routes";
import { Database } from "./config/mongo";
import userSchema from "./models/users.models";


// const options = {
//     key: fs.readFileSync("/home/greenemind/greenemind_com_key.key"),
//     cert: fs.readFileSync( /etc/ssl/ssl.key/s-school_com_mx.key"/home/greenemind/greenemind_com.crt")
// };

// Initializations
const app: Application = express();
const https = require('https').Server(app);
const fs = require('fs');
const http = require('http').Server(app);
export const io = require('socket.io')(http, {
  cors: {
  origin: "*",
  methods: ["GET", "POST"]
}});
// export const io = require('socket.io')(https, {
//   cors: {
//   origin: "*",
//   methods: ["GET", "POST"]
// }});

// Settings
app.set('port', 3000);
const database = Database();


// Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json()); //Used to parse JSON bodies

// Routes
app.use('/user', userRouter);
app.use('/sensor', sensorRouter);
app.use('/products', productRouter);



io.use(async (socket: any, next: any) => {
  if (socket.handshake.query && socket.handshake.query.token){
    verify(socket.handshake.query.token, keys.SECRET_KEY, async (err: any, decoded: any) => {
       if (err) return next(new Error('Authentication error'));
       socket.decoded = decoded;
       await userSchema.findOneAndUpdate({email: decoded.id}, {socket_id: socket.id});
       console.log("ID: " + socket.id);
     next();
     });
  }
  else {
    next(new Error('Authentication error'));
  }    
});

io.on('connection', function(socket: any) {
  console.log('A user connected');

  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});

io.on('messageReceiver', function(socket: any, sid: any, message: any) {
  console.log("Logrado id; " + sid);
  socket.to(sid).emit('Planta', message);
});

// MQTT
const mqttClient: MqttHandler = new MqttHandler();
mqttClient.connect();

// app.use('/', routes);
app.post("/send-mqtt", (req: Request, res: Response) => {
    mqttClient.sendMessage(req.body.message);
    res.status(200).send("Message sent to mqtt");
})

app.get('/', function(req, res) {
   res.sendFile('/home/diego-oseguera/Escritorio/Tesis/be/src/index.html');
   console.log(__dirname, '/index.html');
 });

// Public
app.use(express.static(path.join(__dirname, 'public')));


//Starting the Server
// app.listen(app.get('port'), ()=> {});
http.listen(3000, function() {
  console.log('listening on *:3000');
});
// https.listen(3000, function() {
//   console.log('listening on *:3000');
// });

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