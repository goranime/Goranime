const router = require("express").Router()
const animeController = require("../controllers/animeControllers.js")

router.use('/', animeController.getAll)

module.exports = router