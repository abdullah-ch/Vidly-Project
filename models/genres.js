const Joi = require("joi");
const mongoose = require("mongoose");

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

function genreValidation(genre) {
  const schema = {
    genreName: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
}

module.exports.Genres = Genres;
module.exports.genreValidation = genreValidation;
module.exports.schemaGenre = schemaGenre;