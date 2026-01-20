const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");

const router = express.Router();

router.post("/trigger", async (req, res) => {
  try {
    if (!process.env.WORQHAT_API_KEY || !process.env.WORQHAT_FLOW_URL) {
      return res.status(500).json({ message: "WorqHat configuration missing" });
    }

    const payload = req.body;

    const response = await fetch(process.env.WORQHAT_FLOW_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("WorqHat error:", error);
    res.status(500).json({ message: "WorqHat trigger failed" });
  }
});

module.exports = router;
