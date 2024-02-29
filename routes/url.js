import express from "express";
import { getUrl, redirectUrl } from "../UrlController/url.js";

const router = express.Router();

router.post("/url-shortner", getUrl);
router.get("/:shortUrl", redirectUrl);


export default router;