const express = require("express");
const { Genres } = require("../models/genres");
const { Movies } = require("../models/movies");
const { movieValidation } = require("../models/movies");


const router = express.Router();


async function createMovie(title, numberInStock, dailyRentalRate, genreId) {
  const genre = await Genres.findById(genreId);
  const movie = new Movies({
    title: title,
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate,
    genre: {
      _id: genre._id,
      genreName: genre.genreName,
    },
  });

  console.log(movie);
  await movie.save();
}

router.get("/", async (req, res) => {
  try {
    const result = await Movies.find();
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.log("Can't Display Movies", err.message);
    return;
  }
});

router.get("/:id", async (req, res) => {
  const result = await Movies.findById(req.params.id);
  if (!result)
    return res.status(404).send("Movie Not Found, please check the ID");

  return res.send(result);
});

router.post("/", async (req, res) => {
  const result = movieValidation(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  console.log(req.body.genreId);
  const genre = await Genres.findById(req.body.genreId);
  if (!genre)
    return res.status(404).send("We dont have any genre of such name");

  const movie = new Movies({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      genreName: genre.genreName,
    },
  });
  console.log(movie);
  await movie.save();
  return res.send(movie);
});

router.put("/:id", async (req, res) => {
  const result = movieValidation(req.body);
  if (result.error)
    return res.status(400).send(result.error.details[0].message);

  const movie = await Movies.findById(req.params.id);

  if (!movie)
    return res.status(404).send("Movie Not Found, please check the ID");

  const genre = await Genres.findById(req.body.genreId);
  if (!genre)
    return res.status(404).send("We dont have any genre of such name");

  movie.set({
    title: req.body.title,
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
    genre: {
      _id: genre._id,
      genreName: genre.genreName,
    },
  });

  await movie.save();
  console.log(movie);
  return res.send(movie);
});

router.delete('/:id', async (req, res) => {
    const movie = await Movies.deleteOne({_id : req.params.id})

    if (!movie)  return res.status(404).send("Movie Not Found, please check the ID");
    
    res.send(movie);
    
})
//createMovie("Terminator", 500, 1000, "5e8798e3ad147f125c256782" );


module.exports = router;
