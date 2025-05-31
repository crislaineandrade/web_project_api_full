import Header from './Header/Header';
import Main from './Main/Main';
import Footer from './Footer/Footer';
import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './Main/components/Login';
import Register from './Main/components/Register';
import ProtectedRoute from './Main/components/ProtectedRoute';

import auth from '../utils/auth';
import InfoTooltip from './Main/components/Popup/components/InfoTooltip/InfoTooltip';

function App() {
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isToolTipOpened, setIsToolTipOpened] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) return;

    function getCards() {
      api
        .getCards()
        .then((card) => {
          setCards(card);
        })
        .catch((err) => {
          console.error('Erro ao buscar cards:', err);
        });
    }

    getCards();
  }, [isLoggedIn]);

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .handleLikeAction(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    await api
      .deleteCard(card._id)
      .then(() => {
        setCards((novo) =>
          novo.filter((deleteCard) => deleteCard._id !== card._id)
        );
      })
      .catch((error) => console.log(error));
  }

  const [popup, setPopup] = useState(null);

  function handleOpenPopup(popup) {
    setPopup(popup);
  }

  function handleClosePopup() {
    setPopup(null);
  }

  function handleCloseToolTip() {
    setIsToolTipOpened(false);
  }

  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (token) {
      auth
        .getUserInfo(token)
        .then((userInfo) => {
          setCurrentUser(userInfo);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error('Erro ao buscar usuário:', err);
          setIsLoggedIn(false);
        })
        .finally(() => {
          setIsCheckingToken(false);
        });
    } else {
      setIsCheckingToken(false);
    }
  }, []);

  if (isCheckingToken) return null;

  const handleUpdateUser = (data) => {
    api
      .editProfile(data.name, data.about)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.log(error));
  };

  function handleUpdateAvatar(data) {
    api.editAvatar(data).then((userAvatar) => {
      setCurrentUser(userAvatar);
      handleClosePopup();
    });
  }

  function handleGetAvatar() {
    api.getAvatar().then((userData) => {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        avatar: userData.avatar,
      }));
    });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.nameCard, data.linkCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        handleClosePopup();
      })
      .catch((error) => console.log('Erro ao adcionar cartão', error));
  }

  function register(email, password) {
    auth
      .register(email, password)
      .then((data) => {
        setIsSucceed(true);
        setIsToolTipOpened(true);

        navigate('/signin');

        return data;
      })
      .catch((err) => {
        console.log(err);
        setIsSucceed(false);
        setIsToolTipOpened(true);
      });
  }

  function login(email, password) {
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);

        return api.getAvatar().then((userData) => {
          setCurrentUser({
            ...userData,
            email: currentUser?.email || email,
          });
          navigate('/');
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/signin');
  }

  return (
    <>
      <CurrentUserContext.Provider
        value={{
          currentUser,
          handleUpdateUser,
          handleUpdateAvatar,
          handleGetAvatar,
          handleAddPlaceSubmit,
        }}
      >
        <Header
          email={currentUser?.email}
          isLoggedIn={isLoggedIn}
          onLogOut={handleLogOut}
        />

        {isToolTipOpened && (
          <InfoTooltip
            handleCloseToolTip={handleCloseToolTip}
            isSucceed={isSucceed}
          />
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute
                isLoggedIn={isLoggedIn}
                isCheckingToken={isCheckingToken}
              >
                <Main
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  popup={popup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
              </ProtectedRoute>
            }
          ></Route>

          <Route path="/signin" element={<Login login={login} />}></Route>

          <Route
            path="/signup"
            element={<Register register={register} />}
          ></Route>

          <Route
            path="*"
            element={
              isLoggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />
            }
          ></Route>
        </Routes>

        <Footer />
      </CurrentUserContext.Provider>
    </>
  );
}

export default App;
