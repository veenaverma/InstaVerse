//server

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import dotenv from "dotenv";
dotenv.config();

import storyRoutes from './routes/stories.js';
import userRoutes from './routes/users.js';


const app=express();
//using body-parser functionality of express middleware to parse raw data from the request body into useful data
app.use(bodyParser.json({limit:"32 mb",extended:true}));
app.use(bodyParser.urlencoded({limit:"32 mb",extended:true}));



app.use(cors());
app.use("/stories",storyRoutes);
app.use("/user",userRoutes);



const MONGO_URI=process.env.MONGO_URI;
const PORT=process.env.PORT;

//defining a function for connection
const connectDB = async()=>{
    try{
        await mongoose.connect(MONGO_URI);
        app.listen(PORT,()=>console.log(`Server running on port: ${PORT}`));
    } catch(err){
        console.log(err.message);
    }
}

connectDB();

mongoose.connection.on("open",()=>console.log("Connection made successfully"));
mongoose.connection.on("error",(err)=>console.log(err));