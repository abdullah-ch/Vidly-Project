const express = require("express");
const { Rentals } = require("../models/rentals");
const { rentalValidation } = require("../models/rentals");
const { Customers } = require("../models/customers");
const { Movies } = require("../models/movies");
const Fawn = require("fawn");
const mongoose = require("mongoose");
const router = express.Router();

Fawn.init(mongoose);

async function createRental(customerId, movieId, rentalFee, dateOut) {
  const customer = await Customers.findById(customerId);
  if (!customer) return console.log("There is no customer of such ID");

  const movie = await Movies.findById(movieId);
  if (!movie) return console.log("There is no movie of such Id");

  const rental = new Rentals({
    rentalFee: rentalFee,
    dateOut: dateOut,
    customer: {
      customerName: customer.customerName,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  await rental.save();
  console.log(rental);
}

//createRental("5e887313456c894de44bd238", "5e89a38eba0e0c58a089b9e6", 500, new Date("11/20/2014 04:11") );

router.get("/", async (req, res) => {
  const rental = await Rentals.find();
  return res.send(rental);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const result = rentalValidation(req.body);
  if (result.error)
    return res
      .status(404)
      .send("Check your IDS, they should be of only string type");

  const customer = await Customers.findById(req.body.customerId);
  if (!customer) return res.status(400).send("There is no customer of such ID");

  const movie = await Movies.findById(req.body.movieId);
  if (!movie) return res.status(400).send("There is no movie of such Id");

  if (movie.numberInStock === 0) return res.send("No movie in stock");

  const rental = new Rentals({
    rentalFee: req.body.rentalFee,
    dateOut: req.body.dateOut,
    customer: {
      _id: customer._id,
      customerName: customer.customerName,
      isGold: customer.isGold,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
   
    try {
        console.log("Rental isssssssss");
        console.log(Fawn);
    new Fawn.Task()  .save("rentals", rental)  .update("movies", { _id: movie._id },{
          $inc: { numberInStock: -1 },
        }).run();
      console.log("Rental isssssssss2");
      console.log(rental);

   return res.send(rental);
  } catch (ex) {
    return res.status(500).send("Something Failed");
  }
  // await rental.save();
  // movie.numberInStock--;
  // movie.save;
  // return res.send(rental);
});
module.exports = router;
