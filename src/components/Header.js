import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ email, onLogOut }) {
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <Switch>
        <Route path="/signup">
          <Link className="header__link" to="/signin">
            Войти
          </Link>
        </Route>
        <Route path="/signin">
          <Link className="header__link" to="/signup">
            Регистрация
          </Link>
        </Route>
        <Route exact path="/">
          <div className="header__user-data">
            <p className="header__email">{email}</p>
            <Link className="header__link" to="/signin" onClick={onLogOut}>
              Выйти
            </Link>
          </div>
        </Route>
      </Switch>
    </header>
  );
}

export default Header;