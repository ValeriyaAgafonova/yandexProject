import React from "react";
import Styles from "./OrderDetails.module.css";
import { CheckMarkIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderDetails = () => {
  return (
    <div className={Styles.details}>
      <p className="text text_type_digits-large">122432</p>
      <p className="text text_type_main-default">идентификатор заказа</p>
      <div className={Styles.round}>
        <CheckMarkIcon type="primary" />
      </div>
      <p className="text text_type_main-default">ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetails;
