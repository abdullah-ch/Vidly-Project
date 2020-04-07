const mongoose = require("mongoose");
const Joi = require("joi");
const { schemaGenre } = require("../models/genres");

// Movies Schema

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 200,
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    },
    dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
    },
    genre: {
        type: schemaGenre,
        required: true,
    },
});

const Movies = mongoose.model("Movies", movieSchema);



function movieValidation(movie) {
    console.log(movie);
    const schema = {
        title: Joi.string().min(2).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().required(),
        genreId: Joi.objectId().required(),
    };
    //console.log(schema);

    return Joi.validate(movie, schema);
}

module.exports.Movies = Movies;
module.exports.movieValidation = movieValidation;