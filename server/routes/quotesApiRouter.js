const router = require("express").Router()
const QuoteApiController = require("../controllers/QuoteApiController")

router.get("/", QuoteApiController.getQuote)

module.exports = router;