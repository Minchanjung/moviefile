const { body, validationResult } = require("express-validator")

const Genre = require("../models/Genre");
const Movie = require("../models/Movie");

// Display list of all Authors.
exports.genre_list = async (req, res, next) => {
    const result = await Genre.find()
        .sort([["name"]])
        .exec()
    
    res.render("genre_list", {
        title: "All Genres", 
        genres_list: result,
    })
};

// Display detail page for a specific Author.
exports.genre_detail = async (req, res, next) => {
    const result = await Promise.all([Genre.findById(req.params.id).exec(), Movie.find({genre: req.params.id}).exec()])

    res.render("genre_detail", {title: "Genre Detail", data: result})
};

// Display Author create form on GET.
exports.genre_create_get = (req, res, next) => {
    res.render("genre_form", { title: "Create Genre" });
};

// Handle Author create on POST.
exports.genre_create_post = [
    body("name", "Genre name required").trim().isLength({ min: 1 }).escape(), 
    async (req, res, next) => {
        const errors = validationResult(req);

        const genre = new Genre({ name: req.body.name });

        if (!errors.isEmpty()) {
            res.render("genre_form", {
                title: "Create Genre", 
                genre, 
                errors: errors.array(),
            });
            return
        } else {
            try {
                const check = await Genre.findOne({ name: req.body.name }).exec()
                if (check) {
                    res.redirect(check.url);
                } else {
                    try {
                        const genreSave = await genre.save();
                        console.log(genreSave)
                    } catch (error) {
                        console.log(error)
                    }
                    res.redirect(genre.url);
                    /*genre.save((err) => {
                        if (err) {
                            return next(err);
                        }

                        res.redirect(genre.url);
                    });*/
                }
            } catch (error) {
                console.log(error);
                next(error);
            }
        }
    }
]

// Display Author delete form on GET.
exports.genre_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Author delete on POST.
exports.genre_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Author update form on GET.
exports.genre_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Author update on POST.
exports.genre_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};