import ImagePopup from '../ImagePopup/ImagePopup';
import deleteIcon from '../../../../../../images/Trash.png';

function Card(props) {
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link } = card;
  const imageComponent = {
    title: '',
    children: <ImagePopup card={card} />,
  };

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  const cardLikeButtonClassName = `elements__button-image-like ${
    card.isLiked ? 'elements__button-image-like_isActive' : ''
  }`;
  return (
    <li className="elements__card">
      <img
        className="elements__delete-button"
        src={deleteIcon}
        alt="image of the delete button"
        onClick={handleCardDelete}
      />

      <img
        className="elements__image"
        src={link}
        alt="image of a view"
        onClick={() => handleOpenPopup(imageComponent)}
      />

      <div className="elements__card-content">
        <p className="elements__name-card">{name}</p>

        <button
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}

export default Card;
