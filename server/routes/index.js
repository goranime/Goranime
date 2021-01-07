const router = require('express').Router();
const userRouter = require('./userRouter');
const animeRouter = require('./animeRouter')

const { authentication } = require('../middlewares/auth');

router.use('/', userRouter);
router.use(authentication);
router.use('/anime', animeRouter);

module.exports = router