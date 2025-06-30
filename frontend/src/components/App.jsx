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
import { CurrentTokenContext } from '../contexts/CurrentTokenContext';


function App() {
  const[token, setToken] = useState(localStorage.getItem('jwt') || '')
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSucceed, setIsSucceed] = useState(false);
  const [isToolTipOpened, setIsToolTipOpened] = useState(false);
  const [isCheckingToken, setIsCheckingToken] = useState(true);

  let navigate = useNavigate();


  useEffect(() => {
    if (!isLoggedIn || !token) return;

    api.getCards(token) // passa o token aqui
    .then((response) => {
      const cardsData = response.data ?? response;
      setCards(cardsData);
    })
    .catch((err) => {
      console.error('Erro ao buscar cards:', err);
    });
}, [isLoggedIn, token]);


  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .handleLikeAction(card._id, isLiked, token)
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
      .deleteCard(card._id, token)
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




  function handleUpdateToken(token) {
    localStorage.setItem('jwt', token);
    setToken(token)



  }

  function handleDeleteToken() {
    localStorage.removeItem('jwt');
    setToken(null)


  }

  useEffect(() => {

    const storedToken = localStorage.getItem('jwt')

    if (storedToken) {
      setToken(storedToken)

      api.getUser(storedToken)
      .then((userInfo) => {
        console.log('user Info', userInfo);
        setCurrentUser(userInfo.data ?? userInfo);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error('Erro ao verificar token:', err);
        setIsLoggedIn(false);
      })
      .finally(() => {
        setIsCheckingToken(false);
      });




      // auth.getUserInfo(storedToken)
      // .then((userInfo) => {

      //   api.getUserInfo

      //   console.log('user Info', userInfo)
      //   setCurrentUser(userInfo.data ?? userInfo);
      //   setIsLoggedIn(true);
      // })
      // .catch((err) => {
      //   console.error('Erro ao verificar token:', err);
      //   setIsLoggedIn(false);
      // })
      // .finally(() => {
      //   setIsCheckingToken(false);
      // });
    } else {
       setIsCheckingToken(false);
    }
  }, []);

  if (isCheckingToken) return null;

  const handleUpdateUser = (data) => {
    api
      .editProfile(data.name, data.about, token)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.log(error));
  };

  function handleUpdateAvatar(data) {
    api.editAvatar(data, token).then((userAvatar) => {
      setCurrentUser(userAvatar);
      handleClosePopup();
    });
  }

  function handleGetAvatar() {
    api.getAvatar(token).then((userData) => {
      setCurrentUser((prevUser) => ({
        ...prevUser,
        avatar: userData.avatar,
      }));
    });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data.nameCard, data.linkCard, token)
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
    console.log(email, password)
    auth
      .login(email, password)
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setToken(data.token)
        setIsLoggedIn(true);
        return api.getUserInfo(data.token)
      })
      .then((userInfo) => {
        setCurrentUser(userInfo.data ?? userInfo)
        navigate('/')
      })
      .catch((err) => {
        console.error('Erro no login:', err)
      })

  //       return api.getAvatar().then((userData) => {
  //         setCurrentUser({
  //           ...userData,
  //           email: currentUser?.email || email,
  //         });
  //         navigate('/');
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
   }

  function handleLogOut() {
    localStorage.removeItem('jwt');
    setIsLoggedIn(false);
    setCurrentUser({});
    navigate('/signin');
  }

  return (
    <>
    <CurrentTokenContext.Provider
    value={{
      token,
      handleUpdateToken,
      handleDeleteToken,
    }}>
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



    </CurrentTokenContext.Provider>

    </>
  );
}

export default App;
