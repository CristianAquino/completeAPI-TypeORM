import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRoute, productRoute, stripeRoute, userRoute } from "./routes";
import { handleError, logs } from "./middlewares";
const app = express();

// middlewars
app.use(cors());
app.use(express.json());
app.use(express.raw({ type: "application/json" }));
app.use(cookieParser());
app.use(logs);

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/stripe", stripeRoute);

// errors
app.use(handleError);
export { app };
