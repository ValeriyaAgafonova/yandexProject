import React from "react";
import Styles from "./Modal.module.css";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { SET_CLOSE_INGREDIENT, SET_CLOSE_ORDER } from "../services/actions";

const container = document.getElementById("modals");

const Modal = (props) => {
  console.log(props)
  const dispatch = useDispatch();
  const closeModalIngredient = () => {
    dispatch({ type: SET_CLOSE_INGREDIENT });
    dispatch({ type: SET_CLOSE_ORDER });
  };

  React.useEffect(() => {
    const onClick = (e) => {
      if (e.target.id === "modalOverlay") {
        return closeModalIngredient();
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
        return closeModalIngredient();
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
          <CloseIcon type="primary" onClick={closeModalIngredient} />
        </div>
        {props.children}
      </div>
    </>,
    container
  );
};
// Modal.propTypes = {
//   onClose: PropTypes.func.isRequired,
// };
export default Modal;
