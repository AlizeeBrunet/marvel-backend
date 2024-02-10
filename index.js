require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
