const express = require("express");
const { Customers, customerValidation } = require("../models/customers");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

const router = express.Router();

// Creating customers by creating instance of the customers Class

async function createCustomers() {
  const customer = new Customers({
    customerName: "Bilal",
    isGold: true,
    phone: "0323-8950333",
  });
  try {
    const result = await customer.save();
    console.log(result);
  } catch (err) {
    console.log("Can't add Customers", err.message);
  }
}

//createCustomers();

// Displaying All Courses in the Database

async function displayCustomers() {
  try {
    const result = await Customers.find();
    console.log(result);
  } catch (err) {
    console.log("Can't add Customers", err.message);
  }
}

//displayCustomers();

router.get("/", async (req, res) => {
  const result = await Customers.find()
    .sort({ customerName: 1 })
    .select({ customerName: 1, isGold: 1, phone: 1 });
  return res.send(result);
});

router.get("/:id", async (req, res) => {
  let customer = await Customers.findById(req.params.id);
  console.log(customer);
  if (!customer)
    return res.status(404).send(`Bro, we dont have any customer of such Id..`);

  return res.send(customer);
});

router.post("/", auth, async (req, res) => {
  const result = customerValidation(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  console.log(req.body);

  let customer = new Customers({
    customerName: req.body.customerName,
  });

  customer = await customer.save();
  console.log(customer);

  return res.send(customer);
});

router.put("/:id", auth, async (req, res) => {
  const result = customerValidation(req.body);

  if (result.error) {
    return res.status(400).send(result.error.details[0].message);
  }

  console.log(req.params.id);
  let customer = await Customers.findById(req.params.id);
  console.log(customer);
  if (!customer)
    return res.status(404).send(`Bro, we dont have any customer of such Id..`);

  customer.set({
    customerName: req.body.customerName,
    isGold: req.body.isGold,
    phone: req.body.phone,
  });
  await customer.save();
  console.log(customer);
  return res.send(customer);
});

router.delete("/:id", [auth,admin], async (req, res) => {
  const customer = await Customers.deleteOne({ _id: req.params.id });

  if (!customer)
    return res.status(404).send("Bro, we dont have any customer of such Id");

  return res.send(customer);
});

module.exports = router;
