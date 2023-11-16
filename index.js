import express from "express";
import { connectDB } from "./src/config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import userRouter from "./src/routes/UserRoutes.js";
import apartmentRouter from "./src/routes/apartmentRoute.js";
import { errorHandler } from "./src/middleware/errorMiddleware.js";
import formRouter from "./src/routes/formRoutes.js";
const PORT = process.env.PORT || 5000;

dotenv.config();


connectDB();


const app = express();


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/api/users", userRouter);
app.use("/api/apartment", apartmentRouter);
app.use("/api/form", formRouter);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.yellow.bold);
});