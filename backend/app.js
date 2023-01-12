const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env);
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { celebrate, Joi } = require("celebrate");
const { errors } = require("celebrate");
const userRouter = require("./routes/users");
const cardRouter = require("./routes/cards");
const { login, createUser, logout } = require("./controllers/users");
const auth = require("./middlewares/auth");
const NotFoundError = require("./errors/NotFoundError");
const { URL_REGEX, DEFAULT_ALLOWED_METHODS } = require("./utils/constants");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(requestLogger);

// eslint-disable-next-line consistent-return
app.use((req, res, next) => {
  const { method } = req;
  const requestHeaders = req.headers["access-control-request-headers"];
  //const { origin } = req.headers;
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Origin",
    "https://anothermesto.nomoredomains.club"
  );
  //if (allowedCors.includes(origin)) {
  //res.header("Access-Control-Allow-Origin", origin);
  //}
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }
  next();
});

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

app.use(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.use(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(URL_REGEX),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  createUser
);

app.use("/signout", logout);

app.use(auth);

app.use("/users", userRouter);
app.use("/cards", cardRouter);

app.use("/", (req, res, next) => {
  next(new NotFoundError("Неверный адрес"));
});

app.use(errorLogger);

app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.statusCode).send({ message: err.message });
});

mongoose.connect(
  "mongodb://localhost:27017/mestodb",
  {
    useNewUrlParser: true,
  },
  () => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  }
);
