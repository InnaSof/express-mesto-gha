const userRouter = require('express').Router();
const verifyToken = require('../middlewares/auth');
const {
  getUsers,
  getUserById,
  updateUser,
  updateAvatar,
  getCurrentUser,
} = require('../controllers/users');

userRouter.get('/', getUsers);
userRouter.get('/me', verifyToken, getCurrentUser);
userRouter.get('/:userId', getUserById);
userRouter.patch('/me', verifyToken, updateUser);
userRouter.patch('/me/avatar', verifyToken, updateAvatar);

module.exports = userRouter;
