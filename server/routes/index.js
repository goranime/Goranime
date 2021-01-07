const router = require('express').Router();
const userRouter = require('./userRouter');
// const animeRouter = require('./animeRouter')
const { Controller } = require('../controllers/userController');
const { authentication } = require('../middlewares/auth');

router.use('/', UserRouter);
router.use(authentication);
// router.use('/anime', animeRouter);