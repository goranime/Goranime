const router = require("express").Router()
const GoogleOAuthController = require("../controllers/googleOAuthController")

router.post("/googleLogin", GoogleOAuthController.googleLogin)

module.exports = router