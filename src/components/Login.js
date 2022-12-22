import React from "react";
import { useState } from "react";

function Login({onLogin}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleEmail(event) {
    setEmail(event.target.value);
  }
  
  function handlePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!email || !password) return;
    
    onLogin({
      password: password,
      email: email,
    });
    setEmail('');
    setPassword('');
  }

  return (
    <div className="authorization">
      <form className="popup__form" onSubmit={handleSubmit}>
        <h3 className="popup__title popup__title_authorization">Вход</h3>
        <input type="email" className="popup__input popup__input_type_authorization" name="email" minLength="2" maxLength="30" 
        placeholder="E-mail" required value={email} onChange={handleEmail}/>
        <span className="popup__error"></span>
        <input type="password" className="popup__input popup__input_type_authorization" name="password" minLength="2" maxLength="25" 
        placeholder="Пароль" required value={password} onChange={handlePassword}/>
        <span className="popup__error"></span>
        <button className="popup__save popup__save_authorization">Войти</button>
      </form>
    </div>
  );
}

export default Login;