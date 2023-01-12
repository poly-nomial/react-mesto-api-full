const jwt = require("jsonwebtoken");
const AuthorizationError = require("../errors/AuthorizationError");
const { AUTHORIZATION_ERROR } = require("../utils/constants");
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    const e = new AuthorizationError("Необходима авторизация");
    next(e);
  }

  req.user = payload;

  next();
};
