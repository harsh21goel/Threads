import express from 'express';
import dotenv from "dotenv"
import connectDb from './db/connectDb.js';
import cookieParser from 'cookie-parser';
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
connectDb()
const app = express();
const PORT=process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/api/users",userRoutes)












app.listen( PORT,()=>console.log( `server started at http://localhost:${PORT}`))