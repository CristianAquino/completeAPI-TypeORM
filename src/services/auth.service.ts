import { User } from "../entities";
import {
  ChangeUserPasswordType,
  LoginUserType,
  RegisterUserType,
} from "../types";
import {
  comparePassword,
  confirmToken,
  createToken,
  encryptPassword,
  sendEmail,
} from "../utils";

const { SECRET_WORD_RESET, SECRET_WORD_REFRESH } = process.env;

async function loginUser({ email, password }: LoginUserType) {
  const user = await User.findOneBy({ email });
  const matchPassword =
    user === null ? false : await comparePassword(password, user.password);

  if (!(user && matchPassword)) throw new Error("NOT_FOUND");

  const signToken = {
    id: user.id,
  };

  const expire = 60 * 60;
  const expireRefresh = 60 * 60 * 24;

  const token = createToken(signToken, expire);
  const refreshToken = createToken(
    signToken,
    expireRefresh,
    SECRET_WORD_REFRESH
  );

  user.refreshToken = refreshToken;
  await user.save();

  return { token, refreshToken };
}

async function registerUser({ email, password, username }: RegisterUserType) {
  const user = new User();
  const hashPassword = await encryptPassword(password);
  user.email = email;
  user.password = hashPassword;
  user.username = username;

  const saveUser = await user.save();
  if (!saveUser) throw new Error("NOT_IMPLEMENTED");

  const signToken = {
    id: saveUser.id,
  };

  const expire = 60 * 60;
  const expireRefresh = 60 * 60 * 24;

  const token = createToken(signToken, expire);

  const refreshToken = createToken(
    signToken,
    expireRefresh,
    SECRET_WORD_REFRESH
  );

  user.refreshToken = refreshToken;
  const refreshUser = await user.save();
  if (!refreshUser) throw new Error("NOT_IMPLEMENTED");

  return { token, refreshToken };
}

async function changeUserPassword(id: number, body: ChangeUserPasswordType) {
  const { oldPassword, newPassword } = body;
  const user = await User.findOneBy({ id });
  if (!user) throw new Error("NOT_FOUND");
  const matchPassword = await comparePassword(oldPassword, user.password);
  if (!matchPassword) throw new Error("NOT_FOUND");
  const hashPassword = await encryptPassword(newPassword);
  user.password = hashPassword;
  await user.save();
  return "password changed successfully";
}

async function forgotUserPassword(email: string) {
  const user = await User.findOneBy({ email });
  if (!user) throw new Error("NOT_FOUND");
  const token = createToken({ id: user.id }, 60 * 60, SECRET_WORD_RESET);
  const send = await sendEmail(token);
  if (!send) throw new Error("NOT_IMPLEMENTED");
  user.resetToken = token;
  await user.save();
  return "verify email";
}

async function createUserNewPassword(newPassword: string, token: string) {
  const jwtPayload: any = confirmToken(token, SECRET_WORD_RESET);
  const user = await User.findOneBy({ id: jwtPayload.id });
  if (!(user && user.resetToken)) throw new Error("NOT_FOUND");
  const refreshPassword = await encryptPassword(newPassword);
  user.password = refreshPassword;
  await user.save();
  return "password changed successfully";
}

async function newToken(cookies: any) {
  if (!cookies.refreshToken) throw new Error("NO_CONTENT");

  const refreshToken = cookies.refreshToken;
  const jwtPayload: any = confirmToken(refreshToken, SECRET_WORD_REFRESH);
  const user = await User.findOneBy({ id: jwtPayload.id });

  if (!user) throw new Error("NOT_FOUND");

  const signToken = {
    id: user.id,
  };

  const expire = 60 * 60;

  const token = createToken(signToken, expire);

  return { token };
}

async function logoutUser(cookies: any) {
  if (!cookies.refreshToken) throw new Error("NO_CONTENT");

  const refreshToken = cookies.refreshToken;
  const jwtPayload: any = confirmToken(refreshToken, SECRET_WORD_REFRESH);
  const user = await User.findOneBy({ id: jwtPayload.id });

  if (!user) throw new Error("NOT_FOUND");

  user.refreshToken = "";
  await user.save();
  return "user logged out successfully";
}

export {
  loginUser,
  registerUser,
  changeUserPassword,
  forgotUserPassword,
  createUserNewPassword,
  newToken,
  logoutUser,
};
