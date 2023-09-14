import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoute, userRoute } from "./routes";
import { handleError, logs } from "./middlewares";
const app = express();

// middlewars
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(logs);

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// errors
app.use(handleError);
export { app };
