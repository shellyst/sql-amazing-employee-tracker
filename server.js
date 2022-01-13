const express = require("express");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;
const app = express();

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Handle requests not supported by the app
app.use((req, res) => {
  res.status(404).end();
});

//start the server after the db connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`API server now on port http://localhost:${PORT}`);
  });
});
