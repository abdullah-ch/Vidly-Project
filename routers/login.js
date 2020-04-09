const express = require("express");
const { Registrations } = require("../models/registrations");
const Joi = require("joi");
const bcrypt = require("bcrypt");

const router = express.Router();

// THERE SHOULD BE ONE TO ONE RELATIONSHIP BETWEEN REGISTRATIONS AND AUTHENTICATION !
router.post("/", async (req, res) => {
  const Result = loginValidation(req.body);
  if (Result.error) {
    return res.status(400).send(Result.error.details[0].message);
  }

  let user = await Registrations.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).send("Bruh, invalid email or password");
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  console.log(validPassword);
  if (validPassword === false)
    return res.status(400).send("Bruh, invalid email or password");
  // The Second Argument is a Private String to generate a digital signature
  // Digital Signature protects our payload
  const token = user.generateTokenProperties();

  return res.send(token);
});

function loginValidation(user) {
  const schema = {
    email: Joi.string().min(8).required(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(user, schema);
}

module.exports = router;
