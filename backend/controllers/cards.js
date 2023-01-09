const Card = require('../models/card');
const ServerError = require('../errors/ServerError');
const NotFoundError = require('../errors/NotFoundError');
const InputError = require('../errors/InputError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => {
      next(new ServerError('На сервере произошла ошибка'));
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(200).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new InputError('Переданы некорректные данные'));
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else if (card.owner.toString() !== req.user._id) {
        console.log(card.owner.toString());
        console.log(req.user._id);
        throw new ForbiddenError('Нет прав на удаление карточки');
      } else {
        card.remove();
        return res.status(200).send({ message: 'Карточка удалена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные'));
      } else if (
        err.name === 'NotFoundError'
        || err.name === 'ForbiddenError'
      ) {
        next(err);
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные'));
      } else if (err.name === 'NotFoundError') {
        next(err);
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};

module.exports.unlikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.status(200).send({ data: card });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new InputError('Переданы некорректные данные'));
      } else if (err.name === 'NotFoundError') {
        next(err);
      } else {
        next(new ServerError('На сервере произошла ошибка'));
      }
    });
};
