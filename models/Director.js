const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    first_name: { type: String, required: true, maxLength: 100 }, 
    family_name: { type: String, required: true, maxLength: 100 }, 
    date_of_birth: { type: Date }, 
    date_of_death: { type: Date },
});

DirectorSchema.virtual("name").get(function () {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.first_name} ${this.family_name}`;
    }
    if (!this.first_name || !this.family_name) {
        fullname = "";
    }
    return fullname;
})

DirectorSchema.virtual("url").get(function () {
    return `/catalog/director/${this._id}`;
});

module.exports = mongoose.model("Director", DirectorSchema);