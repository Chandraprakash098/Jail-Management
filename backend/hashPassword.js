const bcrypt = require("bcrypt");

const password = "your_secure_password"; // Replace with your actual secure password
const saltRounds = 10;

bcrypt.hash(password, saltRounds, function (err, hash) {
  if (err) throw err;
  console.log("Hashed Password:", hash); // Copy this hash to your .env file
});
