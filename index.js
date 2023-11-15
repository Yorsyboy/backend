import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";




connectDB();
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const PORT = process.env.PORT || 5000;



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});