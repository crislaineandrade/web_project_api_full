import { useContext } from 'react';
import Popup from './components/Popup/Popup';
import NewCard from '../Main/components/Popup/components/NewCard/NewCard';
import EditProfile from '../Main/components/Popup/components/EditProfile/EditProfile';
import EditAvatar from '../Main/components/Popup/components/EditAvatar/EditAvatar';
import Card from '../Main/components/Popup/components/Card/Card';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import editIcon from '../../images/editPen.png';
import editButton from '../../images/edit_button.png';

import addButton from '../../images/add__button.png';

const newCardPopup = { title: 'Novo Local', children: <NewCard /> };
const editProfilePopup = { title: 'Editar Perfil', children: <EditProfile /> };
const editAvatarPopup = {
  title: 'Alterar a foto do perfil',
  children: <EditAvatar />,
};

function Main({
  onOpenPopup,
  onClosePopup,
  popup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
}) {
  const userContext = useContext(CurrentUserContext);
  const { currentUser } = userContext;

  return (
    <main className="content">
      <section className="profile page-section">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="profile image"
          />
          <img
            className="profile__edit-icon"
            src={editIcon}
            alt="icon of a pen"
            onClick={() => onOpenPopup(editAvatarPopup)}
          />
        </div>

        <div className="profile__info">
          <h1 className="profile__user">{currentUser.name}</h1>

          <button
            type="button"
            className="profile__edit-button"
            onClick={() => onOpenPopup(editProfilePopup)}
          >
            <img
              className="profile__image-edit-button"
              src={editButton}
              alt="edit button"
            />
          </button>

          <p className="profile__paragraph">{currentUser.about}</p>
        </div>

        <button
          type="button"
          className="profile__add-button"
          onClick={() => onOpenPopup(newCardPopup)}
        >
          <img
            className="profile__image-add-button"
            src={addButton}
            alt="add button"
          />
        </button>
      </section>

      <section className="elements">
        <ul className="elements__cards" id="elementsCards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleOpenPopup={onOpenPopup}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
              onAddPlaceSubmit={onAddPlaceSubmit}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </main>
  );
}

export default Main;
