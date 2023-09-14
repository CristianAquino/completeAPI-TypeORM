import { NextFunction, Request, Response } from "express";
import fs from "fs";
import fsPromise from "fs/promises";
import path from "path";
import crypto from "crypto";

// const header = `id\tdate\tip\tuser\tmethod-path\tcode status\tsize transfer\tdomine\tSO`;

async function logEvent(message: string, filename: string) {
  const item = `\n${crypto.randomUUID()}\t${new Date().toISOString()}\t${message}`;
  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromise.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromise.appendFile(
      path.join(__dirname, "..", "logs", filename),
      item
    );
  } catch (error) {
    console.log(error);
  }
}

function logs(req: Request, res: Response, next: NextFunction) {
  // ip - req.socket.localAddress
  // date - toISOString()
  // method - req.method
  // code status - res.statusCode
  // size - req.headers["content-length"]
  // domine - req.headers.origin
  // SO - req.headers["user-agent"]
  // route access - req.path
  const initialIP = req.socket.localAddress;
  const ip = initialIP?.slice(7);
  logEvent(
    `${ip}\t${req.method} - ${req.path}\t${res.statusCode}\t${req.headers["content-length"]}\t${req.headers.origin}\t${req.headers["user-agent"]}`,
    "logs.txt"
  );
  next();
}

export { logs };
