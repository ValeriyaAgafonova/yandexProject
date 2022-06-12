import { React, useState } from "react";
import Styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE_ITEM_FROM_CONSTRUCTOR,
  SET_OPEN_ORDER,
} from "../../services/actions";
import { useDrop } from "react-dnd";
import { getOrder } from "../../services/actions";
import { v4 as uuid } from "uuid";
import ConstructorIngredient from '../ConstructorIngredient/ConstructorIngredient';
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = (props) => {
  const totalPrice = useSelector((state) => state.ingredients.totalPrice);
  const ids = useSelector((state) => state.ingredients.ingredientsId);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const buns = useSelector((state) => state.ingredients.buns);
  const dispatch = useDispatch();

    const [isOpenOrder, setOpenOrder] = useState(false);
  const showModalOrder = () => {
    setOpenOrder(true);
    dispatch(getOrder(ids));
  };
  const closeModalOrder = () => {
    setOpenOrder(false);
  };


  const [buttonDisabled, setButton] = useState(true)

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: "BurgerConstructor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className={Styles.right} ref={drop}>
      <div className={Styles.container}>
        <div className={Styles.margin}>
          {buns === null ? (
            <div className={`${Styles.construct} ${Styles.constructorTop}`}>
              <p>Выберите булку</p>
            </div>
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns.name}(верх)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          )}
        </div>
        <div className={`${Styles.ingredients} custom-scroll`}>
          {ingredients.length === 0 ? (
            <div className={`${Styles.construct} ${Styles.constructMargin}`}>
              <p>Выберите начинку</p>
            </div>
          ) : (
            ingredients.map(
              (item, index) =>
                item.type !== "bun" && (
                  <ConstructorIngredient item={item} key={item.key}/>
                )
            )
          )}
        </div>
        <div className={Styles.margin}>
          {buns === null ? (
            <div className={`${Styles.construct} ${Styles.constructorBottom}`}>
              <p>Выберите булку</p>
            </div>
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name}(низ)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          )}
        </div>
      </div>
      <div className={Styles.amount}>
        <p className="text text_type_digits-medium">
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium" onClick={showModalOrder} disabled={buttonDisabled}>
          Оформить заказ
        </Button>
      </div>
      {isOpenOrder && (
        <Modal onClose={closeModalOrder} children={<OrderDetails />} />
      )}
    </div>
  );
};

// BurgerConstructor.propTypes = {

//
// };

export default BurgerConstructor;
