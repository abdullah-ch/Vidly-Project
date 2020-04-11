const { connection } = require("../dbConnectorCLI");
const mongoose = require("mongoose");

connection();

// Creating a Schema

const schemaCustomer = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    minlength: 2,
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

// Creating customers by creating instance of the customers Class

async function createCustomers(customerName, isGold, phone) {
  const customer = new Customers({
    customerName: customerName,
    isGold: isGold,
    phone: phone,
  });
  try {
    const result = await customer.save();
    console.log(result);
    console.log("Customer Added");
  } catch (err) {
    console.log("Can't add Customers", err.message);
  }
}

// createCustomers("AC",true , "0333-8244704");

// Displaying All Courses in the Database

async function displayCustomers() {
  try {
    const result = await Customers.find();
    console.log(result);
  } catch (err) {
    console.log("Can't Display Customers", err.message);
  }
}

//displayCustomers();

async function updateCustomer(_id, customerName, isGold, phone) {
  console.log("This is the update customer function");
  try {
    const customer = await Customers.findOneAndUpdate(
      { _id: _id },
      {
        $set: {
          customerName: customerName,
          isGold: isGold,
          phone: phone,
        },
      },
      { new: true, useFindAndModify: false }
    );
    console.log(customer);
  } catch (err) {
    console.log(err);
  }
}

// updateCustomer("5e88738a7989fb2fa4b02aed", "CH", false, "0333-8244704");

async function deleteCustomer(_id) {
  try {
    const customer = await Customers.deleteOne({ _id: _id });
    console.log(customer);
  } catch (err) {
    console.log(err);
  }
}

//deleteCustomer("5e90a98895a5ad3f98f3317c");

async function findCustomerByName(customerName) {
  try {
    const name = new RegExp(customerName, "i");
    const customer = await Customers.find({ customerName: name });
    console.log(customer);
  } catch (err) {
    console.log(err);
  }
}

//findCustomerByName("BILAL");

module.exports = {
  createCustomers,
  findCustomerByName,
  deleteCustomer,
  updateCustomer,
  displayCustomers,
};
