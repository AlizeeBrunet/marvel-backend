const express = require("express");
const router = express.Router();
const axios = require("axios");

// une route pour récupérer les personnages
router.get("/characters", async (req, res) => {
  try {
    let query = `apiKey=${process.env.MARVEL_API_KEY}`;

    if (req.query.name) {
      query = query + `&name=${req.query.name}`;
    }
    if (req.query.page) {
      query = query + `&skip=${(req.query.page - 1) * 100}`;
    }

    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?${query}`
    );
    console.log(response.data);
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// une route pour récuperer dans les characters un personnage specifique
router.get("/character/:characterId", async (req, res) => {
  try {
    console.log("query =>", req.query);
    console.log("params =>", req.params.characterId);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data?.length || "La propriété attendue n'existe pas");
    return res.status(200).json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
