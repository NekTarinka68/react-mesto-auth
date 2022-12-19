import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(event) {
    event.preventDefault();
    props.onUpdateAvatar(avatarRef.current.value);
  }

  return (
    <PopupWithForm name={"avatar"} title={"Обновить аватар"} buttonDefaultText={"Сохранить"} isOpen={props.isOpen} onClose={props.onClose} 
    onSubmit={handleSubmit}>
      <input ref={avatarRef} type="url" className="popup__input popup__input_type_avatar" id="avatar-url" name="link" 
      placeholder="Ссылка на аватар" required />
      <span className="popup__error avatar-url-error" id="error-avatar"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;