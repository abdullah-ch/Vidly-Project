const { connection } = require("../dbConnectorCLI");
const mongoose = require("mongoose");

connection();

// Creating a Schema

const schemaGenre = new mongoose.Schema({
  genreName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
  },
});

// Modeling a Class on my Schema

const Genres = mongoose.model("Genres", schemaGenre);

// Creating Genres by creating instance of the Genres Class

async function createGenres(genreName) {
  const genre = new Genres({
    genreName: "genreName",
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

async function updateGenre(_id, genreName) {
  console.log("This is the update customer function");
  try {
    const genre = await Genres.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          genreName: genreName,
        },
      },
      { new: true, useFindAndModify: false }
    );
    console.log(genre);
  } catch (err) {
    console.log(err);
  }
}

async function deleteGenre(_id) {
  try {
    const genre = await Genres.deleteOne({ _id: _id });
    console.log(genre);
  } catch (err) {
    console.log(err);
  }
}

async function findGenreByName(genreName) {
  try {
    const name = new RegExp(genreName, "i");
    const genre = await Genres.find({ genreName: name });
    console.log(genre);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  findGenreByName,
  createGenres,
  deleteGenre,
  updateGenre,
  displayGenres,
};
