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
    const characterId = req.params.characterId;
    const apiKey = `apiKey=${process.env.MARVEL_API_KEY}`;
    if (!apiKey) {
      return res.status(400).json({ message: "Missing API key" });
    }

    const url = `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${apiKey}`;
    const response = await axios.get(url);

    // Si la réponse ne contient pas de données ou que la propriété attendue n'existe pas
    if (!response.data || !response.data.results) {
      return res.status(404).json({ message: "Character not found" });
    }

    // Envoie la réponse de l'API Marvel directement au client
    return res.status(200).json(response.data);
  } catch (error) {
    // Log l'erreur complète pour un débogage plus facile
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
});
module.exports = router;
