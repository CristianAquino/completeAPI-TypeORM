import { z } from "zod";
import { loginUserSchema } from "./auth.schema";

const registerUserSchema = loginUserSchema.extend({
  firstname: z.string().optional(),
  lastname: z.string().optional(),
  username: z.string().min(3, "lastname must be at least 3 characters"),
  // role: z.string().transform((val) => {
  //   if (val === "" || val === null || val === undefined) {
  //     return "user";
  //   }
  //   return val;
  // }),
  // active: z.boolean().transform((val) => {
  //   if (val === null || val === undefined) {
  //     return true;
  //   }
  //   return val;
  // }),
  role: z.string().optional(),
  active: z.boolean().optional(),
});

const changeUserPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .nonempty("password is required")
      .min(8, "Password must be at least 8 characters lon"),
    newPassword: z
      .string()
      .nonempty("password is required")
      .min(8, "Password must be at least 8 characters lon"),
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: "New password must be different from old password",
    path: ["newPassword"],
  });

const forgotUserPasswordSchema = z.object({
  email: z.string().email("Invalid email"),
});

const newPasswordSchema = z.object({
  password: z
    .string()
    .nonempty("password is required")
    .min(8, "Password must be at least 8 characters lon"),
});

export {
  registerUserSchema,
  changeUserPasswordSchema,
  forgotUserPasswordSchema,
  newPasswordSchema,
};
