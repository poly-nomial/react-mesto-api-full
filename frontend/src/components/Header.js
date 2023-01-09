import React from "react";
import { Route, Switch, Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="logo" src={logo} alt="Логотип Место.Россия" />
      <Switch>
        <Route path="/sign-up">
          <Link to="/sign-in" className="header__link hover-opacity">
            Войти
          </Link>
        </Route>
        <Route path="/sign-in">
          <Link to="/sign-up" className="header__link hover-opacity">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <p className="header__email">{props.email}</p>
          <p
            className="header__link header__link_exit hover-opacity"
            onClick={props.onSignOut}
          >
            Выйти
          </p>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;
