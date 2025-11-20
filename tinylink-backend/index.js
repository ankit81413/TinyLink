const express = require("express");
const cors = require("cors");
require("dotenv").config();
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/healthz", (req, res) => {
  res.json({ ok: true, version: "1.0" });
});


app.use("/api/links", require("./routes/links"));

// /:code route
app.get("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const result = await pool.query("SELECT * FROM links WHERE code = $1", [code]);

    if (result.rows.length === 0) {
      return res.status(404).send("Not found");
    }

    if(result.rows[0].is_deleted == 1){
        return res.status(404).send("Page is deleted");
    }

    // update clicks and last_clicked
    await pool.query(
      "UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1",
      [code]
    );

    res.redirect(302, result.rows[0].url);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});


app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
