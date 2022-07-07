import React from "react";
import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const container = document.getElementById("modals");

const Modal = (props) => {

  React.useEffect(() => {
    const onClick = (e) => {
      if (e.target.id === "modalOverlay") {
        return props.onClose(e);
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  React.useEffect(() => {
    const onKeypress = (e) => {
      if (e.key === "Escape") {
        return props.onClose(e);
      }
    };
    document.addEventListener("keydown", onKeypress);
    return () => {
      document.removeEventListener("keydown", onKeypress);
    };
  }, []);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay />
      <div className={Styles.modal} id="modal">
        <div className={Styles.close}>
          <CloseIcon type="primary" onClick={props.onClose} />
        </div>
        {props.children}
      </div>
    </>,
    container
  );
};
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
export default Modal;
