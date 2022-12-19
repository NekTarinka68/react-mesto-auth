import React from "react";

function PopupWithForm(props) {
	return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_is-active' : ''}`}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <h3 className="popup__title">{props.title}</h3>
          <form className="popup__form" name={props.name} onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button className="popup__save" type="submit">{`${props.buttonDefaultText}`}</button>
          </form>
      </div>
    </div>
	);
}

export default PopupWithForm;