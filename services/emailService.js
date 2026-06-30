const transporter = require("../config/mailConfig");

const sendDelayTaskEmail = async (email, title, scheduledTime) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "⏰ Todo Reminder",
    html: `
      <h2>Hello!</h2>

      <p>Your scheduled task is still pending.</p>

      <table border="1" cellpadding="8" cellspacing="0">
        <tr>
          <td><b>Task</b></td>
          <td>${title}</td>
        </tr>

        <tr>
          <td><b>Scheduled Time</b></td>
          <td>${scheduledTime}</td>
        </tr>
      </table>

      <br>

      <p>
        Please open the application and either:
      </p>

      <ul>
        <li>✅ Complete the task</li>
        <li>📝 Add a delay reason if you couldn't complete it</li>
      </ul>

      <br>

      <b>Daily Planner</b>
    `,
  };
  return transporter.sendMail(mailOptions);
};

module.exports = {
  sendDelayTaskEmail,
};
