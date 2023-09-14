import { NextFunction, Response } from "express";
import {
  changeUserPassword,
  createUserNewPassword,
  forgotUserPassword,
  loginUser,
  logoutUser,
  newToken,
  registerUser,
} from "../services";
import { RequestExtens } from "../types";

async function login(req: RequestExtens, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { token, refreshToken } = await loginUser(body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    return res.status(200).json({ token });
  } catch (error) {
    return next(error);
  }
}

async function register(req: RequestExtens, res: Response, next: NextFunction) {
  try {
    const { body } = req;
    const { token, refreshToken } = await registerUser(body);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60,
    });
    return res.status(201).json({ token });
  } catch (error) {
    return next(error);
  }
}

async function changePassword(
  req: RequestExtens,
  res: Response,
  next: NextFunction
) {
  try {
    const { id, body } = req;
    const response = await changeUserPassword(id as number, body);
    return res.status(200).json({ message: response });
  } catch (error) {
    return next(error);
  }
}

async function forgotPassword(
  req: RequestExtens,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = req.params;
    const response = await forgotUserPassword(email);
    return res.status(200).json({ message: response });
  } catch (error) {
    return next(error);
  }
}

async function createNewPassword(
  req: RequestExtens,
  res: Response,
  next: NextFunction
) {
  try {
    const { password } = req.body;
    const { token } = req.params;
    const response = await createUserNewPassword(password, token);
    return res.status(200).json({ message: response });
  } catch (error) {
    next(error);
  }
}

async function refreshToken(
  req: RequestExtens,
  res: Response,
  next: NextFunction
) {
  try {
    const { cookies } = req;
    const response = await newToken(cookies);
    return res.status(201).json(response);
  } catch (error) {
    return next(error);
  }
}

async function logout(req: RequestExtens, res: Response, next: NextFunction) {
  try {
    const { cookies } = req;
    const response = await logoutUser(cookies);

    res.clearCookie("refreshToken", { httpOnly: true });
    return res.status(200).json({ message: response });
  } catch (error) {
    res.clearCookie("refreshToken", { httpOnly: true });
    return next(error);
  }
}

export {
  login,
  register,
  changePassword,
  forgotPassword,
  createNewPassword,
  refreshToken,
  logout,
};
