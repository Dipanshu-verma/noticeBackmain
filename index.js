import dotenv from "dotenv"
import express  from "express"
import mongoConnect from "./database/db.js";
import authRouter from "./routes/authRoute.js";
import noticeRouter from "./routes/noticeRoute.js";
dotenv.config();
import cors from "cors"
const PORT  =  process.env.PORT


const app =  express();
app.use(cors());
app.use(express.json());


 
app.use("/auth", authRouter);
app.use("/notice", noticeRouter)


app.listen(PORT, async()=>{
await mongoConnect();
console.log(`server is running at ${PORT}`);
})