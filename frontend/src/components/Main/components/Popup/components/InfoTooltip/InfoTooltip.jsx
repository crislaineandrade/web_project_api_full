import succededLoginIcon from '../../../../../../images/succeded_login_icon.png';
import failedLoginIcon from '../../../../../../images/Union.svg';
import closeButton from '../../../../../../images/close_Icon.png';
function InfoTooltip({ handleCloseToolTip, isSucceed }) {
  function closeToolTip() {
    handleCloseToolTip();
  }
  return (
    <>
      <div className="register-notice">
        <img
          className="register-notice__close-button"
          src={closeButton}
          alt="close button icon"
          onClick={closeToolTip}
        />
        <img
          src={isSucceed ? succededLoginIcon : failedLoginIcon}
          className="register-notice__succeded-login-icon"
          alt="succeded login icon"
        />
        <p className="register-notice__paragraph">
          {' '}
          {isSucceed
            ? 'Vitória! Você precisa se registrar.'
            : 'Ops, algo saiu deu errado! Por favor, tente novamente.'}
        </p>
      </div>
    </>
  );
}

export default InfoTooltip;
