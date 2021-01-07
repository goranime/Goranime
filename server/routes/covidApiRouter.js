const router = require("express").Router()
const covidApiController = require("../controllers/covidApiController")

router.get("/cases", covidApiController.getLive)

module.exports = router