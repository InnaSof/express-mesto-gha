const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const {
  login, createUser,
} = require('../controllers/users');
const {
  signUpValidation, signInValidation,
} = require('../middlewares/validation');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use('*', () => {
  throw new NotFoundError('Некорректный путь запроса');
});

module.exports = router;
