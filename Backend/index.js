import express from 'express';
import connectDB from "./helper/dbConnection.js";
import { createServer } from 'http';
import * as dotenv from 'dotenv';
import cors from "cors";
import { router } from './routes/routes.js';
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

const httpServer = createServer(app);
httpServer.listen(port, () => console.log(`Server Connected to port ${port}`))
