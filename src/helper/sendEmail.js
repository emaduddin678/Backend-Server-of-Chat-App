import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import emailWithNodeMailer from "./email.js";

const sendEmail = async (emailData) => {
  try {
    // Convert the module's URL into a file path
    const __filename = fileURLToPath(import.meta.url);

    // Get the directory name from the file path
    const __dirname = dirname(__filename);

    const htmlFilePath = path.join(__dirname, "../email/email.html");
    let html = fs.readFileSync(htmlFilePath, "utf-8");
    // Replace placeholders in the HTML template with dynamic values
    html = html.replace("{{-=name=-}}", emailData.name);
    html = html.replace("{{-=activationLink=-}}", emailData.apiURL);
 
    // console.log("html", html);
    await emailWithNodeMailer({ ...emailData, html });
  } catch (emailError) {
    throw emailError;
  }
};

export default sendEmail;
