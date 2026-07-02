const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

(async () => {
  try {
    await transporter.verify();
    console.log("✅ SMTP Connected");
    console.log("Email User:", process.env.EMAIL_USER);
  } catch (err) {
    console.log("❌ SMTP Error");
    console.log(err);
  }
})();

module.exports = transporter;