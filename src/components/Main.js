import React, { useContext } from 'react';
import addButton from '../images/add-button.svg';
import editButton from '../images/button-edit.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main (props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
    <section className="profile">
      <button className="profile__button-change-avatar" onClick={props.onEditAvatar}></button>
      <div style={{ backgroundImage: `url(${currentUser.avatar})` }} className="profile__avatar" />
        <div className="profile__info">
          <div className="profile__name-button">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__button" type="button" aria-label="Кнопка редактирования профиля" onClick={props.onEditProfile}>
              <img className="profile__button-icon" alt="Иконка редактирования профиля" src={editButton} />
            </button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__button-pic" type="button" aria-label="Кнопка добавления фотографии" onClick={props.onAddPlace}>
          <img className="profile__button-pictures" alt="Кнопка добавления фотографии" src={addButton} />
        </button>
      </section>
      <section className="elements">
        {props.cards.map((data) => {
          return(
            <Card key={data._id} card={data} onClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
          )
        })}
      </section>
      </main>
    )
  }

export default Main;