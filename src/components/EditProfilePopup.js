import React, { useContext, useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser.name && currentUser.about) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser, props.isOpen]); 

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm name={"edit"} title={"Редактировать профиль"} buttonDefaultText={"Сохранить"} isOpen={props.isOpen} 
    onClose={props.onClose} onSubmit={handleSubmit}>
      <input value={name} onChange={handleNameChange} type="text" className="popup__input popup__input_type_name" name="name" id="namePopup" minLength="2" maxLength="40" required placeholder="Введите имя" />
      <span className="popup__error namePopup-error" id="error-namePopup"></span>
      <input value={description} onChange={handleDescriptionChange} type="text" className="popup__input popup__input_type_info" name="about" id="infoPopup" minLength="2" maxLength="200" required placeholder="О себе" />
      <span className="popup__error infoPopup-error" id="error-infoPopup"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;