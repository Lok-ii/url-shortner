import { log, error } from "node:console";
import mongoose from "mongoose";
import express from "express";
import path from "node:path";
import bodyParser from "body-parser";
import { fileURLToPath } from "node:url";
import urlRouter from "./routes/url.js"
import dotenv from "dotenv";
const app = express();
const port = 10000;

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose
  .connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.8eetsng.mongodb.net/urlShortner`)
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

