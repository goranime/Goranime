const router = require('express').Router();
const userRouter = require('./userRouter');

const animeRouter = require('./animeRouter')
const covidApiRouter = require('./covidApiRouter');
const quotesApiRouter = require('./quotesApiRouter')
const googleOAuthRouter = require("./googleOAuthRouter")


const { authentication } = require('../middlewares/auth');

router.use("/covid", covidApiRouter)
router.use("/", googleOAuthRouter)
router.use('/', userRouter);
router.use('/covid', covidApiRouter);
router.use('/quote', quotesApiRouter)
router.use(authentication);
router.use('/anime', animeRouter);

module.exports = router