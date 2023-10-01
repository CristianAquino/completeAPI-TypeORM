import { Resend } from "resend";
import ejs from "ejs";
import path from "path";

const { RESEND_KEY } = process.env;
const resend = new Resend(RESEND_KEY);

async function sendEmail(data: any, email: any, nameTemplate: string) {
  const resendEmailSend = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: [email],
    subject: "Send Token",
    // html: `<a href=http://localhost:3000/${token}/new-password>Click for Change Password</a>`,
    html: await ejs.renderFile(
      path.join(__dirname, "..", "templates", `${nameTemplate}.ejs`),
      {
        data,
      }
    ),
    // attachments: [
    //   {
    //     path: "https://raw.githubusercontent.com/nodemailer/nodemailer/master/LICENSE",
    //     filename: "ja.txt",
    //   },
    // ],
  });
  return resendEmailSend;
}

export { sendEmail };
