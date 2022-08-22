const cardRouter = require('express').Router();
const verifyToken = require('../middlewares/auth');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', verifyToken, createCard);
cardRouter.delete('/:cardId', verifyToken, deleteCard);
cardRouter.put('/:cardId/likes', verifyToken, likeCard);
cardRouter.delete('/:cardId/likes', verifyToken, dislikeCard);

module.exports = cardRouter;
