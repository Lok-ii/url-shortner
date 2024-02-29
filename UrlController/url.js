import { nanoid } from "nanoid";
import urlModel from "../UrlModal/url.js";

export const getUrl = (req, res) => {
  // Get the URL from request object
  let url = req.body.url;
  const shortOne = nanoid(8);
  const newData = {
    "shortUrl" : shortOne,
    "longUrl" : url,
  };
  const newUrl = new urlModel(newData);
  newUrl.save();
  res.json({
    success: true,
    message: "short url generated successfully ",
    shortUrl: `http://localhost:10000/${shortOne}`,
  });
};

export const redirectUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const longUrl = await urlModel.findOne({ shortUrl: shortUrl });

  if (!longUrl || !isValidUrl(longUrl.longUrl)) {
    res.status(404).send("URL not found or Invalid URL");
  } else {
    res.redirect(302, longUrl.longUrl);
  }
};


function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}