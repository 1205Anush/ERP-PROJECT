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

    console.log("Received payload:", payload);
    const response = await fetch(process.env.WORQHAT_FLOW_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Trigger response data:", JSON.stringify(data, null, 2));

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("WorqHat error:", error);
    res.status(500).json({ message: "WorqHat trigger failed" });
  }
});

// User information route
router.post("/user-info", async (req, res) => {
  try {
    const payload = req.body; // { userId, email, role, other }
    
    console.log("User info payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/a5a648d0-67e1-429c-875b-bfa9bc414777', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("User info response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("User info error:", error);
    res.status(500).json({ message: "User info fetch failed" });
  }
});

// Password reset route
router.post("/password-reset", async (req, res) => {
  try {
    const payload = req.body;
    
    console.log("Password reset payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/615e4b23-6668-4c31-a5e3-15d10bb76e41', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Password reset response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Password reset failed" });
  }
});

// User registration route
router.post("/register", async (req, res) => {
  try {
    const payload = req.body;
    
    console.log("Registration payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/ff0bbfad-4cf4-4687-a229-d730ce687c16', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Registration response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

module.exports = router;
