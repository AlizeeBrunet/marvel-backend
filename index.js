require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

const charactersRoutes = require("./routes/characters");
app.use(charactersRoutes);

const comicsRoutes = require("./routes/comics");
app.use(comicsRoutes);
app.get("/", (req, res) => {
  console.log("route /");
  res.status(200).json(data);
});

app.all("*", (req, res) => {
  console.log("route not found");
  res.status(404).json({ message: "Not Found" });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server has started");
});
