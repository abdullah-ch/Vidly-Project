const express = require("express");
const { Registrations } = require("../models/registrations");
const { registrationValidation } = require("../models/registrations");
const _ = require("lodash");

const router = express.Router();

async function createRegistration(name, email, password) {
  const registration = new Registrations({
    name: name,
    email: email,
    password: password,
  });

  if (!registration) return console.log("Cannot create registration");

  await registration.save();
  console.log(registration);
}

router.post("/", async (req, res) => {
    console.log(req.body);
     
    const { error } = registrationValidation(req.body);
    console.log("Bruh 3");
    console.log(error)
    if (error) {
        console.log("Bruh 2");
        return res.status(400).send(error.details[0].message);
    }

  let registration = Registrations.findOne({ email: req.body.email });

  if (!registration)
    return res.status(400).send("Bruh, this email has already been used");

    registration = new Registrations(
      _.pick(req.body, ["name", "email", "password"])
    );

  if (!registration) return res.status(400).send("Data entered is wrong");

  await registration.save();
  console.log(registration);
  return res.send(_.pick(registration, ["_id","name", "email"]));
});

//createRegistration("Abdullah", "abdullahch@studentpartner.com", "12344214143");

module.exports = router;


/*

 

{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
  }



*/