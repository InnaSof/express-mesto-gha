const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const verifyToken = require('../middlewares/auth');
const {
  signUpValidation, signInValidation,
} = require('../middlewares/validation');
const NotFoundError = require('../errors/NotFoundError');
const {
  login, createUser,
} = require('../controllers/users');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

router.use(verifyToken);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', () => {
  throw new NotFoundError('Некорректный путь запроса');
});

module.exports = router;
