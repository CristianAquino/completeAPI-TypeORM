import express from "express";
import cors from "cors";
import { authRoute, userRoute } from "./routes";
const app = express();

// middlewars
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

// errors

export { app };
