import express from "express";
import api from "./api/index.js";
import { errorHandler, notFoundHandler } from "./middlewares/error-handler.js";
const app = express();

// Parses incoming requests with JSON payloads
app.use(express.json());
// Parses URL-encoded form data (like HTML forms)
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Welcome to my REST API!");
});

app.use("/api/v1", api);

app.use("/docs", express.static("docs"));

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
