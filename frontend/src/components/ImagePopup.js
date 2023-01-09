function ImagePopup(props) {
    return (
        <div className={`popup popup_type_photo-view ${props.card ? ('popup_opened') : ('')}`}>
            {props.card ? (
                <div className="popup__container-photo">
                    <img className="popup__photo" src={props.card.link} alt={props.card.name} />
                    <h2 className="popup__photo-title">{props.card.name}</h2>
                    <button type="button" aria-label="Закрыть окно" className="popup__close-btn button-decor hover-opacity" onClick={props.onClose}></button>
                </div>
            ) : null}
        </div>
    )
}

export default ImagePopup;