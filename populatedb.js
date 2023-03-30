#! /usr/bin/env node

console.log(
    'This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Movie = require("./models/Movie");
  const Director = require("./models/Director");
  const Genre = require("./models/Genre");
  const ImgUrl = require("./models/ImgUrl");
  
  const genres = [];
  const directors = [];
  const movies = [];
  const imgurls = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false); // Prepare for Mongoose 7
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createGenres();
    await createImgUrls()
    console.log(imgurls)
    await createDirectors();
    await createMovies();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function genreCreate(name) {
    const genre = new Genre({ name: name });
    await genre.save();
    genres.push(genre);
    console.log(`Added genre: ${name}`);
  }
  
  async function directorCreate(first_name, family_name, d_birth, d_death) {
    directordetail = { first_name: first_name, family_name: family_name };
    if (d_birth != false) directordetail.date_of_birth = d_birth;
    if (d_death != false) directordetail.date_of_death = d_death;
  
    const director = new Director(directordetail);
  
    await director.save();
    directors.push(director);
    console.log(`Added director: ${first_name} ${family_name}`);
  }
  
  async function movieCreate(title, summary, director, img, genre, rating) {
    moviedetail = {
      title: title,
      summary: summary,
      director: director,
      rating: rating
    };
    if (genre != false) moviedetail.genre = genre;
    if (img != false) moviedetail.img = img;
  
    const movie = new Movie(moviedetail);
    await movie.save();
    movies.push(movie);
    console.log(`Added movie: ${title}`);
  }

  async function imgUrlCreate(img) {
    const newImgUrl = new ImgUrl({imgUrl: img,});

    await newImgUrl.save();
    imgurls.push(newImgUrl);
    console.log(`added url: ${img}`)
  }
  
  async function createGenres() {
    console.log("Adding genres");
    await Promise.all([
      genreCreate("Fantasy"),
      genreCreate("Science Fiction"),
      genreCreate("Action"),
      genreCreate("Historical")
    ]);
  }
  
  async function createDirectors() {
    console.log("Adding directors");
    await Promise.all([
      directorCreate("Christopher", "Nolan", "1970-6-30", false),
      directorCreate("Quentin", "Tarantino", "1963-3-27", false),
    ]);
  }

  async function createImgUrls() {
    console.log("adding Imgs");
    await Promise.all([
        imgUrlCreate("https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"), 
        imgUrlCreate("https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg")
    ])
  }    
  
  async function createMovies() {
    console.log("Adding Movies");
    await Promise.all([
      movieCreate(
        "Pulp Fiction",
        "In the realm of underworld, a series of incidents intertwines the lives of two Los Angeles mobsters, a gangster's wife, a boxer and two small-time criminals.",
        directors[1],
        imgurls[1], 
        [genres[2]],
        9
      ),
      movieCreate(
        "The Dark Knight",
        "After Gordon, Dent and Batman begin an assault on Gotham's organised crime, the mobs hire the Joker, a psychopathic criminal mastermind who offers to kill Batman and bring the city to its knees.",
        directors[0],
        imgurls[0],
        [genres[2]],
        10
      ),
    ]);
  }
