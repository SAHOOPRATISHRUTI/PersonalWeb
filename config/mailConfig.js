const nodemailer = require("nodemailer");


const dns = require("dns");


dns.lookup("smtp.gmail.com", (err, address, family) => {
  console.log("========== DNS TEST ==========");

  if (err) {
    console.log("DNS Error:", err);
  } else {
    console.log("SMTP Gmail IP:", address);
    console.log("IP Family:", family);
  }

  console.log("==============================");
});


const net = require("net");

const socket = net.connect(465, "smtp.gmail.com");

socket.setTimeout(10000);

socket.on("connect", () => {
  console.log("✅ TCP Connected to Gmail SMTP");
  socket.destroy();
});

socket.on("timeout", () => {
  console.log("❌ TCP Timeout");
  socket.destroy();
});

socket.on("error", (err) => {
  console.log("❌ TCP Error:", err);
});


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