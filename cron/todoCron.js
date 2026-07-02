const cron = require("node-cron");
const { checkDelayedTasks } = require("../services/todoReminderService");
const { autoCreateDailyTodos } = require("../services/todoReminderService");

const startTodoCron = () => {
  // ===============================
  // Delayed Task Reminder (Every 30 mins)
  // ===============================
  cron.schedule("*/30 * * * *", async () => {
    console.log("=================================");
    console.log("Running Delayed Task Cron...");
    console.log(new Date());

    try {
      const delayedTasks = await checkDelayedTasks();

      console.log(
        `Delayed Task Cron Completed. Tasks Found: ${delayedTasks.length}`,
      );
    } catch (error) {
      console.error("Delayed Task Cron Error:", error.message);
    }

    console.log("=================================");
  });

  console.log("✅ Delayed Task Cron Started (Every 30 Minutes)");

  // ===============================
  // Auto Create Daily Todo (12:00 AM)
  // ===============================
  cron.schedule("0 0 * * *", async () => {
    console.log("=================================");
    console.log("Running Auto Daily Todo Cron...");
    console.log(new Date());

    try {
      await autoCreateDailyTodos();

      console.log("✅ Auto Daily Todo Completed");
    } catch (error) {
      console.error("Auto Daily Todo Cron Error:", error.message);
    }

    console.log("=================================");
  });

  console.log("✅ Auto Daily Todo Cron Started (Every Midnight)");
};

module.exports = startTodoCron;
