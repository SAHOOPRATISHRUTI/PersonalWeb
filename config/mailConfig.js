const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log(
  "EMAIL_PASS:",
  process.env.EMAIL_PASS ? "Loaded" : "Missing"
);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  logger: true,
  debug: true,
  connectionTimeout: 60000,
  greetingTimeout: 60000,
  socketTimeout: 60000,
});

(async () => {
  try {
    console.log("Verifying SMTP...");
    await transporter.verify();

    console.log("✅ SMTP Connected");
  } catch (err) {
    console.log("❌ SMTP Error");
    console.log("Message:", err.message);
    console.log("Code:", err.code);
    console.log("Command:", err.command);
    console.log("Stack:", err.stack);
  }
})();

module.exports = transporter;