import React, { useState } from "react";
import Styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = (props) => {
  //состояние и функции открытия попапа с деталями заказа
  const [isOpenOrder, setOpenOrder] = useState(false);
  const showModalOrder = () => {
    setOpenOrder(true);
  };
  const closeModalOrder = () => {
    setOpenOrder(false);
  };

  return (
    <div className={Styles.right}>
      <div className={Styles.container}>
        <div className={Styles.margin}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={1255}
            thumbnail={props.ingredients[0].image}
          />
        </div>
        <div className={`${Styles.ingredients} custom-scroll`}>
          {props.ingredients.map(
            (item, index) =>
              item.type !== "bun" && (
                <div className={Styles.containerIngredient} key={item._id}>
                  <div className={Styles.drag}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
          )}
        </div>
        <div className={Styles.margin}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={1255}
            thumbnail={props.ingredients[0].image}
          />
        </div>
      </div>
      <div className={Styles.amount}>
        <p className="text text_type_digits-medium">
          12342 <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium" onClick={showModalOrder}>
          Оформить заказ
        </Button>
      </div>
      {isOpenOrder && (
        <Modal onClose={closeModalOrder} children={<OrderDetails />} />
      )}
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientTypes).isRequired,
};

export default React.memo(BurgerConstructor);
