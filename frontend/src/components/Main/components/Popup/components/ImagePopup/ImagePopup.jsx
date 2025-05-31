function ImagePopup(props) {
  const { card } = props;
  return (
    <div className='popup__container_image'>
      <img className='popup-image__img' src={card.link} alt='Imagem ampliada' />
      <p className='popup-image__subtitle'>{card.name}</p>
    </div>
  );
}

export default ImagePopup;
