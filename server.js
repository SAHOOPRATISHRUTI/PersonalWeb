const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 8000;

connectDB();

app.get("/", (req, res) => {
  res.send("Expense tracker running");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
