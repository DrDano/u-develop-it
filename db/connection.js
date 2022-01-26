const mysql = require("mysql2");
const { user, pw } = require("../project.config");

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: pw,
      database: "election",
    },
    console.log("Connected to the election database.")
  );

module.exports = db;