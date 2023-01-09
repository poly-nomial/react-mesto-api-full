import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    },[currentUser, isOpen])

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser(name, description);
    }

    return(
        <PopupWithForm name='edit-profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} buttonText='Сохранить' onSubmit={handleSubmit}>
          <div className="input-field">
              <input type="text" id="user-name" value={name || ''} className="popup__input popup__input_type_user-name" minLength="2" maxLength="40" required onChange={handleNameChange}/>
              <span className="popup__input-error popup__user-name-error"></span>
          </div>
          <div className="input-field">
              <input type="text" id="user-desc" value={description || ''} className="popup__input popup__input_type_user-desc" minLength="2" maxLength="200" required onChange={handleDescriptionChange}/>
          <span className="popup__input-error popup__user-desc-error"></span>
          </div>
        </PopupWithForm>
    )
}

export default EditProfilePopup;