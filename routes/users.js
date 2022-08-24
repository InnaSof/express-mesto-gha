const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

const verifyToken = require('../middlewares/auth');

const {
  userIdValidation,
  updateUserValidation,
  updateAvatarValidation,
} = require('../middlewares/validation');

userRouter.use(verifyToken);

userRouter.get('/', getUsers);
userRouter.get('/me', getCurrentUser);
userRouter.get('/:userId', userIdValidation, getUserById);
userRouter.patch('/me', updateUserValidation, updateUser);
userRouter.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = userRouter;
