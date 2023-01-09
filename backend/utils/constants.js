const SERVER_ERROR = 500;
const INPUT_ERROR = 400;
const NOT_FOUND_ERROR = 404;
const AUTHORIZATION_ERROR = 401;
const CONFLICT_ERROR = 409;
const FORBIDDEN_ERROR = 403;
const URL_REGEX = /^https?:\/\/(www\.)?[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
const ID_REGEX = /^[0-9a-f]{24}/;
const allowedCors = [
  "http://anothermesto.nomoredomains.club",
  "https://anothermesto.nomoredomains.club",
  "localhost:3000",
];
const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

module.exports = {
  SERVER_ERROR,
  INPUT_ERROR,
  NOT_FOUND_ERROR,
  AUTHORIZATION_ERROR,
  CONFLICT_ERROR,
  FORBIDDEN_ERROR,
  URL_REGEX,
  ID_REGEX,
  allowedCors,
  DEFAULT_ALLOWED_METHODS,
};
