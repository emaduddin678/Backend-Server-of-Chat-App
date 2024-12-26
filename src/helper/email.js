import nodemailer from "nodemailer";
import { smtpPassword, smtpUsername } from "../../secret.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: smtpUsername,
    pass: smtpPassword,
  },
});

const emailWithNodeMailer = async (emailData) => {
  try {
    const mailOptions = {
      from: smtpUsername, // sender address
      to: emailData.email, // list of receivers
      subject: emailData.subject, // Subject line
      html: emailData.html, // html body
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log("info", "Message sent: %s", info.response);
  } catch (error) {
    // console.log("error", "Error occured while sending email:", error);
    throw error;
  }
};

export default emailWithNodeMailer;
