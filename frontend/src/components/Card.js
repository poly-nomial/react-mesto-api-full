import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);

    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `place__delete-button ${isOwn ? '' : 'place__delete-button_hidden'}`
    )

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);

    const cardLikeClassName = (
        `place__like ${isLiked ? 'place__like_active' : ''}`
    )

    function handleClick() {
        props.onClick(props.card);
    }

    function handleLike() {
        props.onCardLike(props.card);
    }

    function handleDelete() {
        props.onCardDelete(props.card);
    }

    return (
        <article className="place">
                    <button type="button" aria-label="Удалить карточку" className={`${cardDeleteButtonClassName} button-decor hover-opacity`} onClick={handleDelete}></button>
                    <img className="place__pic" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
                    <div className="place__desc">
                        <h2 className="place__name">{props.card.name}</h2>
                        <div className="place__likes">
                            <button type="button" aria-label="Поставить лайк" className={`${cardLikeClassName} button-decor hover-opacity`} onClick={handleLike}></button>
                            <p className="place__number-of-likes">{props.card.likes.length}</p>
                        </div>
                    </div>
                </article>
    )
}

export default Card;