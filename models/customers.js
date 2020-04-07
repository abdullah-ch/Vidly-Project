const Joi = require("joi");
const mongoose = require("mongoose");

// Creating a Schema

const schemaCustomer = new mongoose.Schema({
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
});

// Modeling a Class on my Schema

const Customers = mongoose.model("Customers", schemaCustomer);

function customerValidation(customer) {
  const schema = {
    customerName: Joi.string().min(3).required(),
    isGold: Joi.bool().required(),
    phone: Joi.string().min(3).required(),
  };

  return Joi.validate(customer, schema);
}

module.exports.Customers = Customers;
module.exports.customerValidation = customerValidation;
