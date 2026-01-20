require("dotenv").config();
const express = require("express");
const cors = require("cors");

const worqhatRoutes = require("./routes/worqhat");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/flows", worqhatRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) => {
  if (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
  console.log(`✅ Backend running on port ${PORT}`);
});
