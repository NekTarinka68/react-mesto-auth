import React from 'react';
import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from './EditAvatarPopup';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, data]) => {
            setCurrentUser(user)
            setCards(data);
        })
          .catch((err) => console.log(err))
    }, []);

    function handleCardLike(card) {
      const isLiked = card.likes.some(i => i._id === currentUser._id);

      if (!isLiked) {
        api.getLikeCard(card._id)
          .then((res) => {
            setCards((state) => state.map((c) => c._id === card._id ? res : c));
          })
          .catch((err) => console.log(err))
      } else {
        api.getDislikeCard(card._id)
          .then((res) => {
            setCards((state) => state.map((c) => c._id === card._id ? res : c));
          })
          .catch((err) => console.log(err))
      }
    }

    function handleUpdateUser(data) {
      api.getEditProfile(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => console.log(err))
    }
  
    function handleUpdateAvatar(data) {
      api.getProfileAvatar(data)
        .then((res) => {
          setCurrentUser(res);
          closeAllPopups();
        })
        .catch((err) => console.log(err))
    }
  
    function handleAddPlaceSubmit(data) {
      api.getAddCard(data)
        .then((newCard) => {
          setCards([newCard, ...cards]);
          closeAllPopups()
        })
        .catch((err) => console.log(err)) 
    }

    function handleCardDelete(card) {
      api.getDeleteCard(card._id)
        .then(() => {
          setCards((state) => state.filter((c) => c._id !== card._id));
          closeAllPopups()
        })
        .catch((err) => console.log(err))
    }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  };

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }; 

  function handleCardClick(card) {
    setSelectedCard(card)
  };

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className='page'>
      <Header/>
      <Main onEditAvatar = {handleEditAvatarClick} onEditProfile = {handleEditProfileClick} onAddPlace = {handleAddPlaceClick} 
      onCardClick = {handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <div className="popup popup_type-delete">
        <div className="popup__container-delete">
          <button className="popup__close" type="button" aria-label="Кнопка закрытия попапов"></button>
          <h3 className="popup__title">Вы уверены?</h3>
          <form className="popup__form" name="card-delete-form">
            <button className="popup__save popup__save-del-btn" type="submit">Да</button>
          </form>
        </div>
      </div>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;