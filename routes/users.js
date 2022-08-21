const userRouter = require('express').Router();
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/:userId', getUserById);
userRouter.get('/me', getCurrentUser);
userRouter.patch('/me', updateUser);
userRouter.patch('/me/avatar', updateAvatar);

module.exports = userRouter;
