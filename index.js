import { log } from "node:console";
// import axios from "axios"
import express from "express";
import path from "node:path";
import { nanoid } from "nanoid";
import fs, { write } from "node:fs";
import bodyParser from "body-parser";
import { fileURLToPath } from "node:url";
const app = express();
const port = 10000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.use(express.json());

let urlData = {

}

// const writeFile = (data) => {
//   fs.writeFileSync("record.json", data);
// };

app.use(bodyParser.urlencoded({ extended: true }));

// Serve HTML form for URL shortening
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post("/url-shortner", (req, res) => {
  const url = req.body.url;
  log(url);
  const shortUrlPath = nanoid(8);
//   let recordData = fs.readFileSync("record.json");
//   let urlData = JSON.parse(recordData.toString());

  urlData[shortUrlPath] = url;

  writeFile(JSON.stringify(urlData));
  res.json({
    success: true,
    shortUrl: `https://lok-ii.github.io/url-shortner/${shortUrlPath}`,
  });
});

app.get("/:shortUrl", (req, res) => {
  const shortUrlPath = req.params.shortUrl;
//   const recordData = fs.readFileSync("record.json").toString();
  const urlData = JSON.parse(recordData);
  const longUrl = urlData[shortUrlPath];

  if (longUrl && isValidUrl(longUrl)) {
    res.redirect(longUrl);
  } else {
    res.status(404).send("URL not found");
  }
});

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});

function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
