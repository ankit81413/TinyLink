const express = require("express");
const router = express.Router();
const pool = require("../db");

// CREATE link
router.post("/", async (req, res) => {
  let { name, url, code } = req.body;
  function generateCode(length = 6) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  if (!name) {
    return res.status(400).json({ error: "Name required" });
  }

  if (!url) {
    return res.status(400).json({ error: "URL required" });
  }

  if (!code || code.trim() === "") {
    code = generateCode(4);
  }
  try {
    if (code) {
      const exists = await pool.query(
        "SELECT code FROM links WHERE code = $1",
        [code]
      );

      if (exists.rows.length > 0) {
        return res.status(409).json({ error: "Code already exists" });
      }
    }

    await pool.query(
      "INSERT INTO links (name, url, code) VALUES ($1, $2, $3)",
      [name, url, code]
    );

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// get all link endpt
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM links WHERE is_deleted = 0 ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query("SELECT * FROM links WHERE code = $1", [
      code,
    ]);

    if (result.rows.length === 0){
      return res.status(404).json({ error: "Not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    await pool.query("UPDATE links SET is_deleted = 1 WHERE code = $1", [code]);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
