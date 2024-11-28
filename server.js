require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const PORT = process.env.PORT || 3000;

const app = express();
connectDB();

app.use(express.json());
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
