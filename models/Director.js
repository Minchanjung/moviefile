const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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

DirectorSchema.virtual("birth_date_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
});

DirectorSchema.virtual("death_date_formatted").get(function () {
  return DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
});

module.exports = mongoose.model("Director", DirectorSchema);
