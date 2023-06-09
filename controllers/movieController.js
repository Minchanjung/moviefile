const { body, validationResult } = require("express-validator");

const Movie = require("../models/Movie");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
const Img = require("../models/ImgUrl");

const async = require("async");


//display homepage

exports.index = async (req, res, next) => {
    try {
        const result = await Promise.all([Movie.countDocuments({}), Director.countDocuments({}), Genre.countDocuments({})]);
        console.log(result);
        res.render("index", {title: "Rate a Movie", data: result})
    } catch (error) {
        console.log(error) 
        next(error)
    }
    
}

exports.movie_list = async (req, res, next) => {
    try {
        const request = await Movie.find({}, "title img")
            .sort({ title: 1 }) 
            .populate("director")
            .exec()

        console.log(request);
        res.render("movie_list", {title: "Movie List", movie_list: request})
    } catch (error) {
        console.log(error);
        next(error)
    }
}

// Display detail page for a specific Movies.
exports.movie_detail = async (req, res, next) => {
    try {
        const result = await Movie.findById(req.params.id)
            .populate("director")
            .populate("genre")
            .exec();

        res.render("movie_detail", {title: result.title, movie: result});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

// Display movie create form on GET.
exports.movie_create_get = async (req, res, next) => {
    try {
        const request = await Promise.all([Director.find(), Genre.find()]);
        res.render("movie_form", {
            title: "Create Book", 
            directors: request[0], 
            genres: request[1]
        })
    } catch (error) {
        console.log(error);
        next(error)
    }
};

// Handle Movie create on POST.
exports.movie_create_post = [
    (req, res, next) => {
        if (!Array.isArray(req.body.genre)) {
            req.body.genre = typeof req.body.genre === "undefined" ? [] : [req.body.genre];
        }
        next()
    }, 

    body("title", "Title must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("director", " Director must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("summary", "Summary must not be empty.")
        .trim()
        .isLength({ min: 1 })
        .escape(),
    body("img", "Image must not be empty")
        .trim()
        .isLength({ min: 1 })
        .escape(), 
    body("genre.*").escape(), 
    body("rating", "The rating must be a number between 1 and 10")
        .trim()
        .escape(), 

    async (req, res, next) => {
        const errors = validationResult(req);

        const movie = new Movie({
            title: req.body.title, 
            director: req.body.director, 
            summary: req.body.summary, 
            img: req.body.img,
            genre: req.body.genre,
            rating: req.body.rating
        })

        if (!errors.isEmpty()) {
            try {
                const request = await Promise.all([Director.find(), Genre.find()]);

                for (const genre of request[1]) {
                    if (movie.genre.includes(genre._id)) {
                        genre.checked == "true";
                    }
                }

                res.render("movie_form", {
                    title: "Create Book", 
                    directors: request[0], 
                    genres: request[1], 
                    movie, 
                    errors: errors.array(),
                });
            } catch (error) {
                console.log(error);
                next(error);
            }
            return
        }
        try {
            const movieSave = await movie.save();
            console.log(movieSave)
            res.redirect(movie.url)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
]

// Display Movie delete form on GET.
exports.movie_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete GET");
};

// Handle Movie delete on POST.
exports.movie_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author delete POST");
};

// Display Movie update form on GET.
exports.movie_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update GET");
};

// Handle Movie update on POST.
exports.movie_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Author update POST");
};