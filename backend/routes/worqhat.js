const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const express = require("express");

const router = express.Router();



//for login
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

// Notice add route
router.post("/notice-add", async (req, res) => {
  try {
    const { title, content, priority } = req.body;

    // Construct payload with fixed operation 'add'
    const payload = {
      operation: 'add',
      title,
      content,
      priority: parseInt(priority), // Ensure priority is numeric (1: High, 2: Medium, 3: Low)
    };

    console.log("Notice add payload:", payload);
    // TODO: Replace with actual Notice Add Flow URL
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Notice add response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice add error:", error);
    res.status(500).json({ message: "Notice add failed" });
  }
});

// Admin notice fetch route
router.post("/notice-fetch-admin", async (req, res) => {
  try {
    const payload = {
      operation: 'fetch-admin'
    };

    console.log("Admin notice fetch payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Admin notice fetch response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Admin notice fetch error:", error);
    res.status(500).json({ message: "Admin notice fetch failed" });
  }
});

// Notice approve route
router.post("/notice-approve", async (req, res) => {
  try {
    const { title, content, priority, action } = req.body;

    const payload = {
      operation: 'approve',
      title: title ? title.trim() : '',
      content: content ? content.trim() : '',
      priority: priority || 2,
      action: action ? action.trim() : 'approve'
    };

    console.log("Notice approve payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Notice approve response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice approve error:", error);
    res.status(500).json({ message: "Notice approve failed" });
  }
});

// Notice fetch request (for approved notices)
router.post("/notice-fetch", async (req, res) => {
  try {
    const payload = {
      operation: 'fetch'
    };

    console.log("Approved notice fetch payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Approved notice fetch response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Approved notice fetch error:", error);
    res.status(500).json({ message: "Approved notice fetch failed" });
  }
});

// Notice delete route
router.post("/notice-delete", async (req, res) => {
  try {
    const { title } = req.body;

    const payload = {
      operation: 'delete',
      title: title ? title.trim() : title
    };

    console.log("Notice delete payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Notice delete response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice delete error:", error);
    res.status(500).json({ message: "Notice delete failed" });
  }
});

// Marks management route (display students or add marks)
router.post("/marks-management", async (req, res) => {
  try {
    const { operation, course, exam, marks, student } = req.body;

    const payload = {
      operation,
      course,
      exam,
      marks,
      student
    };

    console.log("Marks management payload:", payload);
    // Using the General Flow URL from .env or a specific one if provided
    const response = await fetch('https://api.worqhat.com/flows/trigger/103d61d7-1476-4e0a-bac0-26ef9e490ebd', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Marks management response:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Marks management error:", error);
    res.status(500).json({ message: "Marks management failed" });
  }
});

module.exports = router;


