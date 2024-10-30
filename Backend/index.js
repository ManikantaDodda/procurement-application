import express from 'express';
import connectDB from "./helper/dbConnection.js";
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import cors from "cors";
import { router } from './routes/routes.js';
import cloudinary from  'cloudinary';
dotenv.config();
const port = process.env.PORT
const app = express();
const corsOptions = {
    origin:  "*",
    methods: ["GET", "POST"],
};
app.use(cors());

app.use(express.json());

connectDB();

app.use(express.urlencoded({extended:true, limit:'50mb'}));
app.use(express.json({limit:'50mb'}));

app.use("/api", router);


cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });


const httpServer = createServer(app);
httpServer.listen(port, () => console.log(`Server Connected to port ${port}`))
