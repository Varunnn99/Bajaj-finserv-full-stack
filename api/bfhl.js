import express from "express";
import { createServerlessHandler } from "@vercel/node"; // <-- trick

const app = express();
app.use(express.json());

app.post("/", (req, res) => {
  res.json({ ok: true, data: req.body });
});

// Export as handler for Vercel
export default createServerlessHandler(app);
