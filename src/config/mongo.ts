import mongoose from "mongoose";

// export default (db: string) => {
//     const connect = () => {
//       mongoose
//         .connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//             useCreateIndex: true,
//             useFindAndModify: false, 
//         })
//         .then(() => {
//           return console.log(`Successfully connected to ${db}`);
//         })
//         .catch(error => {
//           console.log("Error connecting to database: ", error);
//           return process.exit(1);
//         });
//     };
//     connect();
  
//     mongoose.connection.on("disconnected", connect);
//   };

let db: Promise<void>;

//module.exports = function Connection(){

export const Database = async () =>{
    if(!db){
        //db = mongoose.connect('mongodb://mySUPERUserAdmin:Ian2297*@108.175.3.139:27017/meneses?authSource=admin&readPreference=primary&ssl=false', {
        db = mongoose.connect('mongodb://localhost:27017/greenemind', {    
        // user: "mySUPERUserAdmin",
            // password: "Ian2297*",
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false 
        })
        .then(db => console.log('Connected'))
        .catch(err => console.log(err));
    }
    return db;
}
