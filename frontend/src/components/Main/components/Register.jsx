import { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ register }) {
  const [getEmail, setGetEmail] = useState('');
  const [getPassword, setGetPassword] = useState('');

  function createUser(e) {
    e.preventDefault();
    register(getEmail, getPassword);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Inscrever-se</h2>

      <form className="auth__form" onSubmit={createUser}>
        <input
          type="email"
          value={getEmail}
          onChange={(e) => setGetEmail(e.target.value)}
          className="auth__input"
          required
          placeholder="E-mail"
        />

        <input
          type="password"
          value={getPassword}
          onChange={(e) => setGetPassword(e.target.value)}
          className="auth__input"
          required
          placeholder="Senha"
        />

        <button className="auth__submit-button" type="submit">
          Inscrever-se
        </button>
      </form>
      <p className="auth__paragraph">
        Já é um membro?{' '}
        <Link to="/signin" className="auth__link">
          Faça o login aqui!
        </Link>
      </p>
    </div>
  );
}

export default Register;
