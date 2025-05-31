import { useState, useContext } from 'react';
import { CurrentUserContext } from '../../../../../../contexts/CurrentUserContext';

function EditProfile() {
  const userContext = useContext(CurrentUserContext);
  const { currentUser, handleUpdateUser } = userContext;
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateUser({ name, about: description });
  };

  return (
    <form className="popup__form" name="formProfile" onSubmit={handleSubmit}>
      <fieldset className="popup__fieldset">
        <input
          value={name}
          onChange={handleChangeName}
          type="text"
          className="popup__name popup__input"
          id="name"
          name="name"
          placeholder="Nome"
          required
          minLength="2"
          maxLength="40"
        />
        <span className="name-error popup__input_type_error"></span>

        <input
          value={description}
          onChange={handleChangeDescription}
          type="text"
          className="popup__ocupation popup__input"
          id="ocupation"
          name="ocupation"
          placeholder="Sobre mim"
          required
          minLength="2"
          maxLength="200"
        />
        <span className="ocupation-error popup__input_type_error"></span>

        <button type="submit" className="popup__save-button form__submit" on>
          Salvar
        </button>
      </fieldset>
    </form>
  );
}

export default EditProfile;
