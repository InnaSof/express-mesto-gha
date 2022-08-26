const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  cardIdValidation,
} = require('../middlewares/validation');

cardRouter.get('/', getCards);
cardRouter.post('/', createCardValidation, createCard);
cardRouter.delete('/:cardId', cardIdValidation, deleteCard);
cardRouter.put('/:cardId/likes', cardIdValidation, likeCard);
cardRouter.delete('/:cardId/likes', cardIdValidation, dislikeCard);

module.exports = cardRouter;
