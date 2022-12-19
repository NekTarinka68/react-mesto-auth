import React from "react";

function ImagePopup(props) {
  return(
    <div className={`popup popup_type-img ${props.card ? "popup_is-active" : ""}`}>
      <div className="popup__container-img">
        <button className="popup__close" type="button" aria-label="Кнопка закрытия попапов" onClick={props.onClose}></button>
        <img className="popup__image" src={props.card?.link} alt={props.card ? props.card.name : ''} />
        <p className="popup__caption">{props.card ? props.card.name : ''}</p>
      </div>
    </div>
  )
}

export default ImagePopup;