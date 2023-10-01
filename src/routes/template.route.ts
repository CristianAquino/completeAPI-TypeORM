import { Router } from "express";
import { sendEmailNew, template } from "../controllers";

const templateRoute = Router();

templateRoute.get("/:templateName", template);
templateRoute.post("/email", sendEmailNew);

export { templateRoute };
