import ImagePopup from '../ImagePopup/ImagePopup';
import deleteIcon from '../../../../../../images/Trash.png';
import { useState } from 'react';

function Card(props) {
  // const [cardLikeButtonClassName, setCardLikeButtonClassName] = useState('elements__button-image-like')
  const { card, handleOpenPopup, onCardLike, onCardDelete } = props;
  const { name, link } = card;
  const imageComponent = {
    title: '',
    children: <ImagePopup card={card} />,
  };

  function handleLikeClick() {
    console.log('card:', card)
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  // if (card.likes.length) {
    // setCardLikeButtonClassName(card.likes.length ?'elements__button-image-like_isActive': 'elements__button-image-like')
    const cardLikeButtonClassName = card.likes.length ?'elements__button-image-like elements__button-image-like_isActive': 'elements__button-image-like'


  // }else {
  //   setCardLikeButtonClassName('elements__button-image-like')

  // }

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
