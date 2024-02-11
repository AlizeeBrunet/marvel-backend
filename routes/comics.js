const express = require("express");
const router = express.Router();
const axios = require("axios");

// une route pour récupérer les comics
router.get("/comics", async (req, res) => {
  try {
    let query = `apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.title) {
      query = query + `&title=${req.query.title}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// une route pour récuperer dans les comics un personnage specifique
router.get("/comics/:characterId", async (req, res) => {
  try {
    console.log("query =>", req.query);
    console.log("params =>", req.params.characterId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data.comics.length);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// une route pour récuperer un comic bien specifique
router.get("/comic/:comicId", async (req, res) => {
  try {
    console.log("query =>", req.query);
    console.log("params =>", req.params.comicId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${req.params.comicId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    if (response.data.comics && Array.isArray(response.data.comics)) {
      console.log(response.data.comics.length);
    } else {
      console.log(
        "La propriété 'comics' n'existe pas ou n'est pas un tableau."
      );
    }

    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
