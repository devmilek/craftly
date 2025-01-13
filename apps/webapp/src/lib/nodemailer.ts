import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.eu",
  secure: true,
  port: 465,
  auth: {
    user: process.env.ZOHO_EMAIL,
    pass: process.env.ZOHO_PASSWORD,
  },
});

type SendEmailProps = {
  to: string;
  subject: string;
  text: string;
};

export const sendMail = async ({ to, subject, text }: SendEmailProps) => {
  await transporter.sendMail({
    from: '"Craftly 👻" <kontakt@devmilek.com>',
    to,
    subject,
    text,
  });
};
