import express from "express";
import http from "http";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "../src/config/mongoAuth";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoutes";
import { errorHandler, notFound } from "./middleware/errorMiddleware";

const app = express();
const port = 5000;
connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET,PUT,PATCH,POST,DELETE"],
    credentials: true,
  })
);

app.use("/api", userRoute);

app.use(notFound);
app.use(errorHandler);

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
