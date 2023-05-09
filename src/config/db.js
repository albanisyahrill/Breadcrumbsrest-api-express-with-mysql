const mysql = require("mysql");

//Konfigurasi mysql
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "kuliah",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

module.exports = connection;
