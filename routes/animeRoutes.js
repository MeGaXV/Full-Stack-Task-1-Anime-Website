const express = require('express');
const router = express.Router();
const animeController = require('../controllers/animeController');








router.get('/add-anime', animeController.animeForm);

router.post('/anime', animeController.addAnime);

router.get('/anime', animeController.animeDbFetch);

router.get('/spring', animeController.springAnime);

router.get('/summer', animeController.summerAnime);
module.exports = router;