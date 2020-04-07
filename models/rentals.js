const mongoose = require("mongoose");
const Joi = require("joi");

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      customerName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 200,
      },
      isGold: {
        type: Boolean,
        required: true,
      },
      phone: {
        type: String,
        minlength: 3,
        maxlength: 25,
        required: true,
      },
    }),
    required: true,
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        required: true,
        min: 2,
        max: 200,
      },
      dailyRentalRate: {
        type: Number,
        required: true,
        min: 0,
      },
    }),
    required: true,
  },
  dateOut: {
    type: Date,
    required: true,
    default: Date.now,
  },

  dateReturned: {
    type: Date,
  },
  rentalFee: {
    type: Number,
    min: 0,
  },
});

const Rentals = mongoose.model("Rentals", rentalSchema);

function rentalValidation(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required(),
    rentalFee: Joi.number(),
  };

  return Joi.validate(rental, schema);
}

module.exports.rentalSchema = rentalSchema;
module.exports.Rentals = Rentals;
module.exports.rentalValidation = rentalValidation;
