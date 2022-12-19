import React, { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    props.onAddPlace({
      name: name,
      link: link
    })
  }

  function handleNameChange(event) {
    setName(event.target.value)
  }

  function handleLinkChange(event) {
    setLink(event.target.value)
  }

  return (
    <PopupWithForm name={"add"} title={"Новое место"} buttonDefaultText={"Создать"} isOpen={props.isOpen} onClose={props.onClose} 
    onSubmit={handleSubmit}>
      <input type="text" className="popup__input popup__input_type_title" required name="name" id="titlePopup" minLength="2" maxLength="30" 
      placeholder="Название" value={name} onChange={handleNameChange}/>
      <span className="popup__error titlePopup-error" id="error-titlePopup"></span>
      <input type="url" className="popup__input popup__input_type_link" required name="link" id="linkPopup" placeholder="Ссылка на картинку"
      value={link} onChange={handleLinkChange} />
      <span className="popup__error linkPopup-error" id="error-linkPopup"></span>
    </PopupWithForm>
  )
}

export default AddPlacePopup;