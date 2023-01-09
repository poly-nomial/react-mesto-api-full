import React from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(email, password);
  }

  return (
    <div className="sign-up">
      <h1 className="sign-up__title">Регистрация</h1>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          value={email || ""}
          placeholder="Email"
          className="sign-up__input sign-up__input_email"
          minLength="5"
          required
          onChange={handleEmailChange}
        />
        <input
          type="password"
          id="password"
          value={password || ""}
          placeholder="Пароль"
          className="sign-up__input sign-up__input_password"
          minLength="2"
          required
          onChange={handlePasswordChange}
        />
        <button type="submit" className="sign-up__button hover-opacity">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="sign-up__link hover-opacity">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
