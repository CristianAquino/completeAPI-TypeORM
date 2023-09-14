import { Router } from "express";
import { userById, userDelete, userEdit } from "../controllers";
import { verifyToken } from "../middlewares";

const userRoute = Router();

userRoute.get("/", verifyToken, userById);
userRoute.patch("/", verifyToken, userEdit);
userRoute.delete("/", verifyToken, userDelete);

export { userRoute };
