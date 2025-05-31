import logo from "../../images/logo_header.png";
function Header({ email, isLoggedIn, onLogOut }) {
  return (
    <header className="header">
      <div className="header__content">
        <img className="header__logo" src={logo} alt="logo" />

        {isLoggedIn && (
          <div className="header__user">
            <p className="header__email">{email}</p>
            <button className="header__logout" onClick={onLogOut}>
              Sair
            </button>
          </div>
        )}
      </div>

      <div className="header__line"></div>
    </header>
  );
}

export default Header;
