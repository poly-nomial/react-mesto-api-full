const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  AUTHORIZATION_ERROR,
  DublicateErrorCode,
} = require("../utils/constants");
const ServerError = require("../errors/ServerError");
const NotFoundError = require("../errors/NotFoundError");
const InputError = require("../errors/InputError");
const ConflictError = require("../errors/ConflictError");
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((e) => {
      if (e.name === "NotFoundError") {
        next(e);
      } else {
        next(new ServerError("На сервере произошла ошибка"));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) =>
      User.create({
        name: req.body.name,
        about: req.body.about,
        avatar: req.body.avatar,
        email: req.body.email,
        password: hash,
      })
    )
    .then((user) =>
      res.status(200).send({
        data: {
          name: user.name,
          about: user.about,
          avatar: user.avatar,
          email: user.email,
        },
      })
    )
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new InputError("Переданы некорректные данные"));
      } else if (e.code === DublicateErrorCode) {
        next(new ConflictError("Пользователь с таким адресом уже существует"));
      } else {
        next(new ServerError("На сервере произошла ошибка"));
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new InputError("Переданы некорректные данные"));
      } else if (e.name === "NotFoundError") {
        next(e);
      } else {
        next(new ServerError("На сервере произошла ошибка"));
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Пользователь не найден");
      } else {
        res.status(200).send({ data: user });
      }
    })
    .catch((e) => {
      if (e.name === "ValidationError") {
        next(new InputError("Переданы некорректные данные"));
      } else if (e.name === "NotFoundError") {
        next(e);
      } else {
        next(new ServerError("На сервере произошла ошибка"));
      }
    });
};

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res
        .cookie("jwt", token, { maxAge: 3600000, httpOnly: true })
        .send({ message: "Авторизация успешна" });
    })
    .catch((err) => {
      res.status(AUTHORIZATION_ERROR).send({ message: err.message });
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie("jwt", { httpOnly: true }).send({ message: "Выход успешен" });
};
