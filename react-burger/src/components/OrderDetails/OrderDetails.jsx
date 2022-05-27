import React from "react";
import Styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  return (
    <div className={Styles.details}>
      <p className="text text_type_digits-large">122432</p>
      <p className="text text_type_main-default">идентификатор заказа</p>
      <img
        className={Styles.done}
        src={require("../../images/done.gif")}
        alt="done"
      />
      <p className="text text_type_main-default">ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
