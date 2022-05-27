import React from "react";
import Styles from "./ModalOverlay.module.css";

const ModalOverlay = () => {
 

  return (
    <div
      className={Styles.overlay}
      id="modalOverlay"
    //   onClick={closeModal}
    ></div>
  );
};

export default ModalOverlay;
