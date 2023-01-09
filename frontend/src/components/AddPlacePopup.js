import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    const newCard = {
        name: name,
        link: link
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace(newCard);
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    },[isOpen])

    return (
        <PopupWithForm name='add-place' title='Новое место' isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
          <div className="input-field">
              <input type="text" id="place-name" value={name} placeholder="Название" className="popup__input popup__input_type_place-name" minLength="2" maxLength="30" onChange={handleNameChange} required />
              <span className="popup__input-error popup__place-name-error"></span>
          </div>
          <div className="input-field">
              <input type="url" id="place-link" value={link} placeholder="Ссылка на картинку" className="popup__input popup__input_type_place-link" onChange={handleLinkChange} required /> 
              <span className="popup__input-error popup__place-link-error"></span>
          </div>   
        </PopupWithForm>
    )
}

export default AddPlacePopup;