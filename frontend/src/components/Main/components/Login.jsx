import { useState } from 'react';
import { Link } from 'react-router-dom';

function Login({ login }) {
  const [getEmail, setGetEmail] = useState('');
  const [getPassword, setGetPassword] = useState('');

  function loginUser(e) {
    e.preventDefault();
    login(getEmail, getPassword);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Entrar</h2>

      <form className="auth__form" onSubmit={loginUser}>
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
          Entrar
        </button>
      </form>
      <p className="auth__paragraph">
        Ainda não é membro?{' '}
        <Link to="/signup" className="auth__link">
          Inscreva-se aqui!
        </Link>
      </p>
    </div>
  );
}

export default Login;
