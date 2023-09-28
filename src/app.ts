import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { handleError, logs } from "./middlewares";
import { authRoute, productRoute, stripeRoute, userRoute } from "./routes";
const app = express();

// middlewars
app.use(cors());
// app.use(express.raw({ type: "application/json" }));
// app.use(express.json());
app.use((req, res, next) => {
  if (req.originalUrl.includes("/api/v1/stripe/webhook")) {
    return next();
  }
  return bodyParser.json()(req, res, next);
});

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
