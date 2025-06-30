import { CurrentUserContext} from '../../../../../../contexts/CurrentUserContext.js';
import { CurrentTokenContext } from '../../../../../../contexts/CurrentTokenContext.js';
import { useState, useContext } from 'react';


function EditAvatar() {
  const userContext = useContext(CurrentUserContext);

  const tokenContext = useContext(CurrentTokenContext)

  const { handleUpdateAvatar } = userContext;

  const [avatar, setAvatar] = useState();
  function handleChangeAvatar(e) {
    setAvatar(e.target.value);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateAvatar(avatar);
  };

  return (
    <form className="popup-edit-profile__form" onSubmit={handleSubmit}>
      <input
        type="url"
        value={avatar}
        onChange={handleChangeAvatar}
        className="popup-edit-profile__link popup__input"
        id="link"
        placeholder="Link de imagem"
        required
        name="link"
      />
      <span className="link-error popup__input_type_error"></span>

      <button
        type="submit"
        className="popup-edit-profile__save-button form__submit"
      >
        Salvar
      </button>
    </form>
  );
}

export default EditAvatar;
