import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Register from "./Register";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { api } from "../utils/api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import { register, login, checkToken } from "../utils/Authorization";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [isInfoTooltipOpened, setIsInfoTooltipOpened] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, data]) => {
          setCurrentUser(user);
          setCards(data);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    if (!isLiked) {
      api
        .getLikeCard(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => console.log(err));
    } else {
      api
        .getDislikeCard(card._id)
        .then((res) => {
          setCards((state) => state.map((c) => (c._id === card._id ? res : c)));
        })
        .catch((err) => console.log(err));
    }
  }

  function handleUpdateUser(data) {
    api
      .getEditProfile(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(data) {
    api
      .getProfileAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(data) {
    api
      .getAddCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .getDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpened(false);
  }

  useEffect(() => {
    checkToken()
      .then((res) => {
        setEmail(res.data.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  }, [history]);

  function handleRegister(data) {
    register(data)
      .then(() => {
        setRegistered(true);
        setIsInfoTooltipOpened(true);
        history.push("/signin");
      })
      .catch((err) => {
        console.log(err);
        setRegistered(false);
        setIsInfoTooltipOpened(true);
        console.log(setIsInfoTooltipOpened(true));
      });
  }

  function handleLogin(data) {
    login(data)
      .then((res) => {
        console.log(res);
        setLoggedIn(true);
        setEmail(data.email);
        localStorage.setItem("jwt", res.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        setIsInfoTooltipOpened(true);
        setRegistered(false);
      });
  }

  function handleSignOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onLogOut={handleSignOut} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          ></ProtectedRoute>
          <Route path="/signup">
            <Register onRegister={handleRegister} />
          </Route>
          <Route path="/signin">
            <Login onLogin={handleLogin} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <InfoTooltip
          isOpen={isInfoTooltipOpened}
          onClose={closeAllPopups}
          registered={registered}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;