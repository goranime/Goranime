const router = require("express").Router()
const animeController = require("../controllers/animeControllers.js")

router.get('/', animeController.getAll)
router.get('/:animeId', animeController.getById)

module.exports = router