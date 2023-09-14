import { Request } from "express";

export interface RequestExtens extends Request {
  id?: number;
}
