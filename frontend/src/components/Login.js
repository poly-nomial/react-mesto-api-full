import React from "react";
import { useHistory } from "react-router-dom";

function Login({ onSubmit }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const history = useHistory();

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
      <h1 className="sign-up__title">Вход</h1>
      <form className="sign-up__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="email"
          value={email || ""}
          placeholder="Email"
          className="sign-up__input sign-up__input_email"
          minLength="5"
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          id="password"
          value={password || ""}
          placeholder="Пароль"
          className="sign-up__input sign-up__input_password"
          minLength="2"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit" className="sign-up__button hover-opacity">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
