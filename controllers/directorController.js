const { body, validationResult } = require("express-validator")

const Director = require("../models/Director");
const Movie = require("../models/Movie");

// Display list of all Authors.
exports.director_list = async (req, res, next) => {
    const result = await Director.find()
        .sort([["family_name", "ascending"]])
        .exec()

    res.render("director_list", {title: "All Directors", director_list: result})
};

// Display detail page for a specific Author.
exports.director_detail = async (req, res, next) => {
    const result = await Promise.all([Director.findById(req.params.id).exec(), Movie.find({director: req.params.id}, "title").exec()])

    res.render("director_detail", {title: "Director Detail", data: result});
};

// Display Author create form on GET.
exports.director_create_get = (req, res, next) => {
res.render("director_form", { title: "Create Director" });
};

// Handle Author create on POST.
exports.director_create_post = [
    body("first_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("First name must be specified")
        .isAlphanumeric()
        .withMessage("First name has non-alphanumeric characters."), 
    body("family_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Family name must be specified.")
        .isAlphanumeric()
        .withMessage("Family name has non-alphanumeric charaters."), 
    body("date_of_birth", "Invalid date of birth")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),
    body("date_of_death", "Invalid date of death")
        .optional({ checkFalsy: true })
        .isISO8601()
        .toDate(),

    async (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render("director_form"< {
                title: "Create Director", 
                author: req.body, 
                errors: errors.array(), 
            });
            return;
        }

        const director = new Director({
            first_name: req.body.first_name, 
            family_name: req.body.family_name, 
            date_of_birth: req.body.date_of_birth, 
            date_of_death: req.body.date_of_death,
        });

        try {
            const resultSave = await director.save();
            console.log(resultSave)
        } catch (error) {
            console.log(error) 
            next(error)
        }

        res.redirect(director.url)
    }
]

// Display Author delete form on GET.
exports.director_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.director_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.director_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.director_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};