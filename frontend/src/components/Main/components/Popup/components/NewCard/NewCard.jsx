import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';

export default function NewCard() {
  const userContext = useContext(CurrentUserContext);
  const { handleAddPlaceSubmit } = userContext;

  const [nameCard, setNameCard] = useState();

  function handleChangeNameCard(e) {
    setNameCard(e.target.value);
  }

  const [linkCard, setLinkCard] = useState();
  function handleChangeLinkCard(e) {
    setLinkCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleAddPlaceSubmit({ nameCard, linkCard });
  }

  return (
    <form className="popup-edit__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="popup-edit__name popup__input"
        id="edit-name"
        placeholder="Título"
        required
        minLength="2"
        maxLength="30"
        name="name"
        value={nameCard}
        onChange={handleChangeNameCard}
      />
      <span className="edit-name-error popup__input_type_error"></span>

      <input
        type="url"
        className="popup-edit__link popup__input"
        id="link"
        placeholder="Link de imagem"
        required
        name="link"
        value={linkCard}
        onChange={handleChangeLinkCard}
      />
      <span className="link-error popup__input_type_error"></span>

      <button type="submit" className="popup-edit__create-button form__submit">
        Criar
      </button>
    </form>
  );
}
