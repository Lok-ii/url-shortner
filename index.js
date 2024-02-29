import { log, error } from "node:console";
// import axios from "axios"
import mongoose from "mongoose";
import express from "express";
import path from "node:path";
import { nanoid } from "nanoid";
import fs, { write } from "node:fs";
import bodyParser from "body-parser";
import { fileURLToPath } from "node:url";
import urlRouter from "./routes/url.js"
const app = express();
const port = 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect("mongodb://localhost:27017/urlShortner")
  .then(() => {
    log("Database connected successfully");
  })
  .catch((err) => {
    log("Database connection failed");
    error(err);
  });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form for URL shortening
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/", urlRouter)

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});

