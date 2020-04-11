const mongoose = require("mongoose");

function connection() {
  mongoose
    .connect("mongodb://localhost:27017/genres-vidly", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .catch((err) => console.log("Cannot connect to database", err.message));
}
module.exports.connection = connection ;
