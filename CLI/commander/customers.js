const program = require("commander");
const { prompt } = require("enquirer");
const {
  createCustomers,
  deleteCustomer,
  displayCustomers,
  findCustomerByName,
  updateCustomer,
} = require("../CLI_Files/customers");

const questions = [
  {
    type: "input",
    name: "customerName",
    message: "Customer Name :",
  },
  {
    type: "input",
    name: "isGold",
    message: "Customer Membership Status (true/false) :",
  },
  {
    type: "input",
    name: "phone",
    message: "Customer Phone Number :",
  },
];

program.description("CLIENT COMMAND LINE MANAGEMENT SYSTEM").version("1.0.0");

// Adding a customer
program
  .command("add")
  .alias("a")
  .description("Add a Customer")
  .action(() => {
    prompt(questions).then((answers) => {
      createCustomers(answers.customerName, answers.isGold, answers.phone);
    });
  });

// List All Customers in Database
program
  .command("list ")
  .alias("i")
  .description("List all customers")
  .action(() => {
    displayCustomers();
  });

// Update A Customer
program
  .command("update <_id>")
  .alias("u")
  .description("Update a Customer")
    .action((_id) => {
       console.log(_id);
      prompt(questions).then((answers) => {
        
          updateCustomer(_id, answers.customerName, answers.isGold, answers.phone);
      }).catch(err => {console.log(err)});
    });
  
// Remove A Customer
program
  .command("remove <_id>")
  .alias("r")
  .description("Remove a Customer")
    .action((_id) => {
        deleteCustomer(_id);
    });


    // Find A Customer
program
  .command("find <customerName>")
  .alias("f")
  .description("Find a Customer by Name")
  .action((customerName) => {
    findCustomerByName(customerName);
  });

  
program.parse(process.argvs);
