const jwt = require("jsonwebtoken");
const AuthorizationError = require("../errors/AuthorizationError");
const { AUTHORIZATION_ERROR } = require("../utils/constants");
const { NODE_ENV, JWT_SECRET } = process.env;

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(AUTHORIZATION_ERROR)
      .send({ message: "Необходима авторизация" });
  }

  let payload;

  console.log(NODE_ENV);

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === "production" ? JWT_SECRET : "dev-secret"
    );
  } catch (err) {
    next(new AuthorizationError("Необходима авторизация"));
  }

  req.user = payload;

  next();
};
