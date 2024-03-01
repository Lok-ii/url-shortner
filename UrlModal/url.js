import mongoose from "mongoose";

const urlSchema = {
    "shortUrl" : {
        type: String,
        required: true,
    },
    "longUrl" : {
        type: String,
        required: true,
    }
}

const urlModel = mongoose.model("urls", urlSchema);
export default urlModel;