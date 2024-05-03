require('dotenv').config()
const mongoose = require("mongoose");
// let username = "promise";
// let password = "3XfurcZfeH7RRXCR";
let username = process.env.MONGO_DB_USERNAME;
let password = process.env.MONGO_DB_PASSWORD;

console.log(username, password)

const URI = `mongodb+srv://${username}:${password}@sonarcluster.ilugm4x.mongodb.net/?retryWrites=true&w=majority`;


async function connectDB() {
  await mongoose
    .connect(URI)
    .then(() => {
      console.log("Connected to DB 🚀🚀🚀🚀🌎");
    })
    .catch((error) => console.log("Error from DB", error));
}

// mongoose.set("useCreateIndex", true);

module.exports = connectDB;
