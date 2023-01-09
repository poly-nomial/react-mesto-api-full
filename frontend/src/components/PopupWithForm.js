import React from "react";
function PopupWithForm(props) {
    return (
        <div className={`popup popup_type_${props.name} ${props.isOpen? ('popup_opened') : ('')}`}>
            <div className='popup__container'>
                <h2 className='popup__title'>{props.title}</h2>
                <form className='popup__form' name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className="popup__save-btn hover-opacity">{props.buttonText}</button>
                </form>
                <button type="button" aria-label="Закрыть окно" className="popup__close-btn button-decor hover-opacity" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm;