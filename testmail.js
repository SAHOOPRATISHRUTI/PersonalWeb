const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "pratishrutisahoo7@gmail.com",
    pass: "fkiywqearkqqgfmz",
  },
});

(async () => {
  try {
    console.log("Before verify");
    await transporter.verify();
    console.log("SMTP Connected");
  } catch (err) {
    console.log(err);
  }
})();
