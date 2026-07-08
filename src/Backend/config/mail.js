import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  family: 4,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
console.log("SMTP CONFIG");
console.log("HOST:", "smtp.gmail.com");
console.log("PORT:", 587);
console.log("USER:", process.env.EMAIL_USER);

await transporter
  .verify()
  .then(() => console.log("SMTP VERIFIED"))
  .catch((err) => console.error("SMTP VERIFY ERROR:", err));

export default transporter;
