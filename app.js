const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routers/genres");
const customers = require("./routers/customers");
const movies = require("./routers/movies");
const rentals = require("./routers/rentals");
const registrations = require("./routers/registrations");

mongoose
  .connect("mongodb://localhost:27017/genres-vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DataBase has been connected !"))
  .catch((err) => console.log("Cannot connect to database", err.message));

const app = express();
app.use(express.json());
app.use("/vidly.com/api/genres", genres);
app.use("/vidly.com/api/customers", customers);
app.use("/vidly.com/api/movies", movies);
app.use("/vidly.com/api/rentals", rentals);
app.use("/vidly.com/api/registrations", registrations);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`I am listening at ${port}`);
});
