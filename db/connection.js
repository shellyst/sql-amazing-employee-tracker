const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "ChenmowHi0801",
  database: "employees",
});

module.exports = db;
