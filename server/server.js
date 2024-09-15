const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

const joiSwagger = require("./app/validators/validator");

var corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to wallet api" });
});

app.use('/api', require("./app/routes/tasks.routes"));

// set port, listen for requests
const PORT = process.env.PORT || 7003;
db.sequelize
  .sync()
  .then(() => {
    joiSwagger.wrapRouter(app).listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });
