const express = require("express");
const { Genres, genreValidation } = require("../models/genres");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// Creating Genres by creating instance of the Genres Class

async function createGenres() {
  const genre = new Genres({
    genreName: "LUST",
  });
  try {
    const result = await genre.save();
    console.log(result);
  } catch (err) {
    console.log("Can't add Genres", err.message);
  }
}

// Displaying All Genres in the Database

async function displayGenres() {
  try {
    const result = await Genres.find();
    console.log(result);
  } catch (err) {
    console.log("Can't add Genres", err.message);
  }
}
//createGenres();
//displayGenres();

router.get("/", async (req, res) => {
  try {
    const result = await Genres.find();
    console.log(result);
    return res.send(result);
  } catch (err) {
    console.log("Can't Display Genres", err.message);
    return;
  }
});

router.get("/:id", async (req, res) => {
  let genre = await Genres.findById(req.params.id);
  console.log(genre);
  if (!genre)
    return res.status(404).send(`Bro, we dont have any genre of such Id..`);

  return res.send(genre);
});

router.post("/", auth, async (req, res) => {
  const result = genreValidation(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  console.log(req.body);
  let genre = new Genres({
    genreName: req.body.genreName,
  });

  genre = await genre.save();
  console.log(genre);
  console.log("The Token Pay load  is", req.user);
  return res.send(genre);
});

router.put("/:id", auth, async (req, res) => {
  const result = genreValidation(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  console.log(req.params.id);
  let genre = await Genres.findById(req.params.id);
  console.log(genre);
  if (!genre)
    return res.status(404).send(`Bro, we dont have any genre of such Id..`);

  genre.set({
    genreName: req.body.genreName,
  });
  await genre.save();
  console.log(genre);
  return res.send(genre);
});

router.delete("/:id", [auth,admin], async (req, res) => {
  const genre = await Genres.deleteOne({ _id: req.params.id });

  if (!genre)
    return res.status(404).send("Bro, we dont have any genre of such Id");

  return res.send(genre);
});

module.exports = router;
