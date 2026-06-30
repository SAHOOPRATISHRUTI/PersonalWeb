const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pratishrutisahoo7@gmail.com",
    pass: "fkiywqearkqqgfmz",
  },
});

(async () => {
  try {
    await transporter.verify();
    console.log("SMTP Connected");
  } catch (err) {
    console.log(err);
  }
})();
