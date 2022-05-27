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
  React.useEffect(() => {
    const onClick = (e) => {
      if (e.target.localName === "button") {
        return showModalOrder();
      }
    };
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);
  return (
    <div className={Styles.right}>
      <div className={Styles.container}>
        <div className={Styles.margin}>
          <ConstructorElement
            key={props.ingredients[0]._id}
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
                <div className={Styles.containerIngredient}>
                  <div className={Styles.drag}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    key={item._id}
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
            key={props.ingredients[0]._id}
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
        <Button type="primary" size="medium">
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
  ingredients: PropTypes.arrayOf(ingredientTypes),
};

export default React.memo(BurgerConstructor);
