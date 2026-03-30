import express from "express";
import api from "./api/index.js";
const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.json({ ok: true, data: req.body });
});

app.use("/api/v1", api);

export default app;
