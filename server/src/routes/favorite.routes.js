const express = require("express");
const { addCollection, getCollections, addMovieToCollection } = require("../controllers/favoriteController");

const router = express.Router();

router.post("/:userId/collections", addCollection);
router.get("/:userId/collections", getCollections);
router.post("/:userId/collections/add-movie", addMovieToCollection);

module.exports = router;
