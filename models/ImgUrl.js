const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ImgUrlSchema = new Schema({
    imgUrl: { type: String },
})

ImgUrlSchema.virtual("url").get(function () {
    return `/catalog/movie/img/${_id}`
})

module.exports = mongoose.model("ImgUrl", ImgUrlSchema);