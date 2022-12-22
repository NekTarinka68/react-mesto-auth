import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onRegister({ email, password });
  }

  function handleEmail(event) {
    setEmail(event.target.value);
  }

  function handlePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <div className="authorization">
      <form className="popup__form" onSubmit={handleSubmit}>
        <h3 className="popup__title popup__title_authorization">Регистрация</h3>
        <input
          type="email"
          className="popup__input popup__input_type_authorization"
          name="email"
          minLength="2"
          maxLength="30"
          placeholder="E-mail"
          required
          onChange={handleEmail}
          value={email}
        />
        <span className="popup__error"></span>
        <input
          type="password"
          className="popup__input popup__input_type_authorization"
          name="password"
          minLength="2"
          maxLength="25"
          placeholder="Пароль"
          required
          onChange={handlePassword}
          value={password}
        />
        <span className="popup__error"></span>
        <button className="popup__save popup__save_authorization">
          Зарегистрироваться
        </button>
        <Link to="/signin" className="authorization__login">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </div>
  );
}

export default Register;