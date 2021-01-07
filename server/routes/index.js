const router = require("express").Router()
const animeRouter = require("./animeRouter.js")

router.use('/anime', animeRouter)

module.exports = router