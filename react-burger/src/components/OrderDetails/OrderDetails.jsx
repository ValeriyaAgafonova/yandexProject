import React from "react";
import { useSelector } from "react-redux";
import Styles from "./OrderDetails.module.css";

const OrderDetails = () => {
  const { orderNumber, orderRequest, orderFailed } = useSelector(
    (state) => state.ingredients
  );
  return (
    <div className={Styles.details}>
      {orderRequest && "Загрузка..."}
      {orderFailed && "Произошла ошибка"}
      {!orderRequest && !orderFailed && orderNumber && (
        <p className="text text_type_digits-large">{orderNumber}</p>
      )}
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
