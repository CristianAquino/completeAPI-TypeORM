import { z } from "zod";

const loginUserSchema = z.object({
  email: z.string().nonempty("username is required").email("email is invalid"),
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters lon"),
});

export { loginUserSchema };
