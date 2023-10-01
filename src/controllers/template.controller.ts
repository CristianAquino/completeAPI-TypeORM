import { NextFunction, Request, Response } from "express";
import { sendEmail } from "../utils";
import { sendEmailBillData } from "../templates/data";

function template(req: Request, res: Response, next: NextFunction) {
  try {
    const { templateName } = req.params;
    return res.render(templateName, {
      data: JSON.stringify(sendEmailBillData),
    });
  } catch (error) {
    next(error);
  }
}

async function sendEmailNew(req: Request, res: Response) {
  try {
    const response = await sendEmail(
      JSON.stringify(sendEmailBillData),
      "ycristiantest@gmail.com",
      "send-email-bill"
    );
    return res.send(response);
  } catch (error) {
    console.log(error);
  }
}

export { sendEmailNew, template };
