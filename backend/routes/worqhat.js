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

//for teacher related course action
router.post("/course-add", async (req, res) => {
  try {
    const payload = req.body;

    console.log("Course add payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/b3e98171-a8a3-4637-853e-22fbbe483a7b', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Course add response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Course add error:", error);
    res.status(500).json({ message: "Course add failed" });
  }
});

//for notice management
router.post("/notice-add", async (req, res) => {
  try {
    const payload = req.body;

    console.log("Notice add payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Notice add response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice add error:", error);
    res.status(500).json({ message: "Notice add failed" });
  }
});

//for fetching approved notices
router.post("/notice-fetch", async (req, res) => {
  try {
    const payload = {
      operation: 'fetch'
    };

    console.log("Notice fetch payload:", payload);
    const response = await fetch('https://api.worqhat.com/flows/trigger/c91c97ce-7dc2-4a10-a71d-3b6fb3b864cc', {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.WORQHAT_API_KEY_ANUSH}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    console.log("Notice fetch response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice fetch error:", error);
    res.status(500).json({ message: "Notice fetch failed" });
  }
});

//for admin to fetch pending notice requests
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
    console.log("Admin notice fetch response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Admin notice fetch error:", error);
    res.status(500).json({ message: "Admin notice fetch failed" });
  }
});

//for admin to approve notice requests
router.post("/notice-approve", async (req, res) => {
  try {
    const { title } = req.body;
    const payload = {
      title: title,
      action: 'approve'
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
    console.log("Notice approve response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice approve error:", error);
    res.status(500).json({ message: "Notice approve failed" });
  }
});

//for admin to delete approved notices
router.post("/notice-delete", async (req, res) => {
  try {
    const { title } = req.body;
    const payload = {
      title: title,
      operation: 'delete'
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
    console.log("Notice delete response data:", JSON.stringify(data, null, 2));
    res.status(200).json(data);
  } catch (error) {
    console.error("Notice delete error:", error);
    res.status(500).json({ message: "Notice delete failed" });
  }
});

module.exports = router;


