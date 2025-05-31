export default function Popup(props) {
  const { onClose, title, children } = props;

  return (
    <>
      <section className="popup">
        <div
          className={`popup__container ${
            !title ? 'popup-image__container' : ''
          }`}
        >
          <button
            type="button"
            className="popup__close-button"
            onClick={onClose}
          ></button>

          {title && <h2 className="popup__title">{title}</h2>}

          {children}
        </div>
      </section>
    </>
  );
}
