import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const USERNAME =  process.env.DB_USERNAME;
const PASSWORD =  process.env.DB_PASSWORD;

const url = `mongodb://dipanshuverma585:dipanshuverma@ac-dyxtfcd-shard-00-00.mbiyul4.mongodb.net:27017,ac-dyxtfcd-shard-00-01.mbiyul4.mongodb.net:27017,ac-dyxtfcd-shard-00-02.mbiyul4.mongodb.net:27017/?ssl=true&replicaSet=atlas-sixufj-shard-0&authSource=admin&retryWrites=true&w=majority`

const mongoConnect  =  () =>{

    mongoose.connect(url,{useNewUrlParser:true});
 
    mongoose.connection.on("connected", ()=>{
        console.log("mongo is connected");
    })
    mongoose.connection.on("disconnected", ()=>{
        console.log("mongo is disconnected");
    })

    mongoose.connection.on("error", (error)=>{
console.log("error while connecting mongo", error.message);
    })

}
export default mongoConnect
