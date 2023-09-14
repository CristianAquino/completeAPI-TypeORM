import { Resend } from "resend";
import ejs from "ejs";
import path from "path";

const { RESEND_KEY } = process.env;
const resend = new Resend(RESEND_KEY);

async function sendEmail(token: string) {
  const data = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["ycristiantest@gmail.com"],
    subject: "Send Token",
    // html: `<a href=http://localhost:3000/${token}/new-password>Click for Change Password</a>`,
    html: await ejs.renderFile(
      path.join(__dirname, "..", "templates", "sendEmail.ejs"),
      {
        token,
      }
    ),
    // attachments: [
    //   {
    //     path: "https://raw.githubusercontent.com/nodemailer/nodemailer/master/LICENSE",
    //     filename: "ja.txt",
    //   },
    // ],
  });
  return data;
}

export { sendEmail };
