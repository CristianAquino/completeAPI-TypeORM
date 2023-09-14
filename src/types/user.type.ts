import { z } from "zod";
import { changeUserPasswordSchema, registerUserSchema } from "../schemas";

const registerUser = registerUserSchema.pick({
  username: true,
  email: true,
  password: true,
});

type RegisterUserType = z.infer<typeof registerUser>;
type ChangeUserPasswordType = z.infer<typeof changeUserPasswordSchema>;

export { RegisterUserType, ChangeUserPasswordType };
