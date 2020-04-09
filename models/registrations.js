const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const config = require("config");

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
    min: 4,
    max: 50,
    required: true,
    unique: true,
  },

  isAdmin: {
    type: Boolean,
  }
});

registerSchema.methods.generateTokenProperties = function () {
  // The reason that I used "this" is because "_id" is a property
  // of the instance of the registration class, so the instance's
  // object's reference is available due to ".methods" method !
  return jwt.sign({ _id: this._id , isAdmin: this.isAdmin }, config.get("jwtPrivateKey"));
};

const Registrations = mongoose.model("Registrations", registerSchema);

function registrationValidation(registration) {
  console.log("registration data", registration);
  const schema = {
    name: Joi.string().min(1).required(),
    email: Joi.string().min(8).required(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(registration, schema);
}

module.exports.Registrations = Registrations;
module.exports.registrationValidation = registrationValidation;
