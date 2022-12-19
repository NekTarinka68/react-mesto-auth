import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = (`element__delete ${isOwn ? 'element__delete_active' : ''}`);
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = (`element__like ${isLiked ? 'element__like_active' : 'element__like'}`);

  function handleClick() {
    props.onClick(props.card)
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }
  
  return(
    <div className="element">
      <div onClick={handleClick} style={{ backgroundImage: `url(${props.card.link})` }} className="element__pictures" />
        <div className="element__description">
          <h2 className="element__title">{props.card.name}</h2>
          <div className="element__like_container">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="Кнопка лайка карточек"></button>
          <div className="element__like_numbers">{props.card.likes.length}</div>
          </div>
        </div>
          <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="Кнопка удаления карточек"></button>
    </div>
  )
}

export default Card