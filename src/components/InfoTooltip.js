import succes from "../images/Succes.svg";
import error from "../images/Error.svg";

function InfoTooltip({ isOpen, onClose, registered }) {
  return (
    <div className={`popup popup__infoTooltip ${isOpen ? 'popup_is-active' : ''}`}>
      <div className="popup__container popup__container-infoTooltip">
        <button className="popup__close" type="button" onClick={onClose}></button>
        <img className="popup__image-infoTooltip" src={ registered ? succes : error } alt="результат" />
        <p className="popup__title-infoTooltip">
          { registered ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.' }
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;