const express = require("express");
const router = express.Router();

const movie_controller = require("../controllers/movieController");
const director_controller = require("../controllers/directorController");
const genre_controller = require("../controllers/genreController");
const img_controller = require("../controllers/imgController");

router.get("/", movie_controller.index);

router.get("/movie/create", movie_controller.movie_create_get);

router.post("/movie/create", movie_controller.movie_create_post);

router.get("/movie/:id/delete", movie_controller.movie_delete_get);

router.post("/movie/:id/delete", movie_controller.movie_delete_post);

router.get("/movie/:id/update", movie_controller.movie_update_get);

router.post("/movie/:id/update", movie_controller.movie_update_post);

router.get("/movie/:id", movie_controller.movie_detail);

router.get("/movies", movie_controller.movie_list);

//director routes
router.get("/director/create", director_controller.director_create_get);

router.post("/director/create", director_controller.director_create_post);

router.get("/director/:id/delete", director_controller.director_delete_get);

router.post("/director/:id/delete", director_controller.director_delete_post);

router.get("/director/:id/update", director_controller.director_update_get);

router.post("/director/:id/update", director_controller.director_update_post);

router.get("/director/:id", director_controller.director_detail);

router.get("/directors", director_controller.director_list);

//genre routes
router.get("/genre/create", genre_controller.genre_create_get);

router.post("/genre/create", genre_controller.genre_create_post);

router.get("/genre/:id/delete", genre_controller.genre_delete_get);

router.post("/genre/:id/delete", genre_controller.genre_delete_post);

router.get("/genre/:id/update", genre_controller.genre_update_get);

router.post("/genre/:id/update", genre_controller.genre_update_post);

router.get("/genre/:id", genre_controller.genre_detail);

router.get("/genres", genre_controller.genre_list);

//imgurl root

router.get("/img/:id", img_controller.imgurl_get_post);

router.get("/img/create", img_controller.imgurl_add_get);

router.post("/img/create", img_controller.imgurl_add_post);

router.get("/img/:id/delete", img_controller.imgurl_delete_get);

router.post("/img/:id/delete", img_controller.imgurl_delete_post);

module.exports = router;