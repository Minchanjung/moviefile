const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    title: { type: String, required: true }, 
    director: { type: Schema.Types.ObjectId, ref: "Director", required: true }, 
    summary: { type: String, required: true },
    img: { type: Schema.Types.ObjectId, ref: "ImgUrl", required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }], 
    rating: { type: Number, min: 1, max: 10 }
});

MovieSchema.virtual("url").get(function () {
    return `/catalog/movie/${this._id}`;
});

module.exports = mongoose.model("Movie", MovieSchema);