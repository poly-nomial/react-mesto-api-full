import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import api from "../utils/Api.js";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoToolTip from "./InfoToolTip.js";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute.js";
import * as Auth from "../utils/Auth.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [selectedCard, handleCardClick] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [userEmail, setEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [isRegistered, setRegistered] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  const history = useHistory();

  function tokenCheck() {
    return Auth.authorize()
      .then((res) => {
        if (res.data) {
          setEmail(res.data.email);
          handleLoggedIn();
          history.push("/");
        } else {
          console.log(`${res.message}`);
          history.push("/sign-in");
        }
      })
      .catch((err) => console.log(err));
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    api
      .getUserInfo()
      .then((data) => {
        setCurrentUser(data);
      })
      .then(() => {
        api
          .getCardsFromServer()
          .then((res) => {
            setCards(res);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleAvatarEditClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function openToolTip() {
    setIsInfoToolTipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    handleCardClick(null);
  }

  function handleUpdateUser(name, description) {
    api
      .editUserInfo(name, description)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarLink) {
    api
      .updateAvatar(avatarLink)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(card) {
    api
      .postNewCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  function handleSignOut() {
    handleLoggedIn();
    localStorage.removeItem("token");
    history.push("/sign-in");
  }

  function handleLoginSubmit(email, password) {
    Auth.login(email, password)
      .then(() => {
        handleLoggedIn();
        setEmail(email);
        history.push("/");
      })
      .catch((err) => console.log(err));
  }

  function handleRegisterSubmit(email, password) {
    Auth.register(email, password)
      .then(() => {
        setRegistered(true);
      })
      .catch((err) => {
        setRegistered(false);
        setErrorMessage(err);
      })
      .finally(() => {
        openToolTip();
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={userEmail} onSignOut={handleSignOut} />
        <Switch>
          <Route path="/sign-up">
            <Register onSubmit={handleRegisterSubmit} />
          </Route>
          <Route path="/sign-in">
            <Login onSubmit={handleLoginSubmit} />
          </Route>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleAvatarEditClick}
            onCardClick={handleCardClick}
          />
        </Switch>
        <Footer />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
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
        <PopupWithForm
          name="confirmation"
          title="Вы уверены?"
          isOpen={false}
          onClose={closeAllPopups}
          buttonText="Да"
          onSubmit={() => {}}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <InfoToolTip
          isRegistered={isRegistered}
          onClose={closeAllPopups}
          isOpen={isInfoToolTipOpen}
          errorMessage={errorMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
