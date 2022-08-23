const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const verifyToken = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  login, createUser,
} = require('../controllers/users');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(verifyToken);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Маршрут не найден'));
});

module.exports = router;
