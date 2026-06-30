const cron = require("node-cron");
const { checkDelayedTasks } = require("../services/todoReminderService");

// Runs every 5 minutes
const startTodoCron = () => {
  cron.schedule("*/2 * * * *", async () => {
    console.log("=================================");
    console.log("Running Delayed Task Cron...");
    console.log(new Date());

    try {
      const delayedTasks = await checkDelayedTasks();

      console.log(
        `Cron Completed. Delayed Tasks Found: ${delayedTasks.length}`
      );
    } catch (error) {
      console.error("Cron Error:", error.message);
    }

    console.log("=================================");
  });

  console.log("✅ Todo Cron Started (Every 5 Minutes)");
};

module.exports = startTodoCron;