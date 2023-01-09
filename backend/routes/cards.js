const { celebrate, Joi } = require('celebrate');
const cardRouter = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  unlikeCard,
} = require('../controllers/cards');
const { URL_REGEX, ID_REGEX } = require('../utils/constants');

cardRouter.get('/', getCards);
cardRouter.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      link: Joi.string().required().pattern(URL_REGEX),
    }),
  }),
  createCard,
);
cardRouter.delete(
  '/:cardId',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().pattern(ID_REGEX),
    }),
  }),
  deleteCard,
);
cardRouter.put(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().pattern(ID_REGEX),
    }),
  }),
  likeCard,
);
cardRouter.delete(
  '/:cardId/likes',
  celebrate({
    params: Joi.object().keys({
      cardId: Joi.string().pattern(ID_REGEX),
    }),
  }),
  unlikeCard,
);

module.exports = cardRouter;
