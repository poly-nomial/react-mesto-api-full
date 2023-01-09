import React from "react";
import { useHistory } from "react-router-dom";
import registerCheck from "../images/RegisterCheck.png";
import registerFail from "../images/RegisterFail.png";

function InfoToolTip({ isRegistered, onClose, isOpen, errorMessage }) {
  const history = useHistory();

  function redirect() {
    onClose();
    history.push("/sign-in");
  }

  return (
    <div className={`popup info-tool-tip ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container info-tool-tip__container">
        {isRegistered ? (
          <>
            <img
              className="info-tool-tip__pic"
              src={registerCheck}
              alt="Галочка успеха"
            />
            <h2 className="info-tool-tip__title">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
          <>
            <img
              className="info-tool-tip__pic"
              src={registerFail}
              alt="Крестик провала"
            />
            <h2 className="info-tool-tip__title">{errorMessage}</h2>
          </>
        )}
        <button
          type="button"
          aria-label="Закрыть окно"
          className="popup__close-btn button-decor hover-opacity"
          onClick={isRegistered ? redirect : onClose}
        ></button>
      </div>
    </div>
  );
}

export default InfoToolTip;
