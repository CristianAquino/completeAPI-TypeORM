import { Router } from "express";
import {
  changePassword,
  createNewPassword,
  forgotPassword,
  login,
  logout,
  refreshToken,
  register,
} from "../controllers";
import {
  schemaBodyValidate,
  schemaParamsValidate,
  verifyToken,
} from "../middlewares";
import {
  changeUserPasswordSchema,
  forgotUserPasswordSchema,
  loginUserSchema,
  newPasswordSchema,
  registerUserSchema,
} from "../schemas";

const authRoute = Router();

authRoute.post("/signin", schemaBodyValidate(loginUserSchema), login);
authRoute.post("/signup", schemaBodyValidate(registerUserSchema), register);
authRoute.put(
  "/change-password",
  verifyToken,
  schemaBodyValidate(changeUserPasswordSchema),
  changePassword
);
authRoute.put(
  "/:email/forgot-password",
  schemaParamsValidate(forgotUserPasswordSchema),
  forgotPassword
);
authRoute.put(
  "/:token/new-password",
  schemaBodyValidate(newPasswordSchema),
  createNewPassword
);
authRoute.get("/refresh-token", refreshToken);
authRoute.get("/logout", logout);

export { authRoute };
