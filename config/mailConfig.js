const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 30000,
  greetingTimeout: 30000,
  socketTimeout: 30000,
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected");
    console.log("Email User:", process.env.EMAIL_USER);
  } catch (err) {
    console.log("❌ SMTP Error");
    console.log("Message:", err.message);
    console.log("Code:", err.code);
    console.log("Command:", err.command);
    console.log(err);
  }
})();

module.exports = transporter;