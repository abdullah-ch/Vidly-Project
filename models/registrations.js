const mongoose = require("mongoose");
const Joi = require("joi");

const registerSchema = new mongoose.Schema({
  name: {
    type: String,
    min: 1,
    max: 200,
    required: true,
  },
  email: {
    type: String,
    unique: true, // To ensure we dont save same email in two documents in mongo db
    min: 15,
    max: 50,
    required: true,
  },
  password: {
    type: String,
    min: 8,
    max: 50,
    required: true,
    unique: true
  },
});

const Registrations = mongoose.model("Registrations", registerSchema);

function registrationValidation(registration) {
  console.log(registration)
  console.log("I am in models-registrations")
  const schema = {
    name: Joi.string().min(1).required(),
    email: Joi.string().min(8).required(),
    password: Joi.string().min(8).required(),
  };
  return Joi.validate(registration, schema);
}

module.exports.Registrations = Registrations;
module.exports.registrationValidation = registrationValidation;