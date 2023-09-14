import { z } from "zod";
import { loginUserSchema } from "../schemas";

type LoginUserType = z.infer<typeof loginUserSchema>;

export { LoginUserType };
