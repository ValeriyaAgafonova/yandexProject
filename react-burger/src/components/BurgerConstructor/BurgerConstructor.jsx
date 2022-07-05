import { React, useState, useMemo } from "react";
import Styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { REWRITE_INGREDIENTS } from "../../services/actions";
import { useDrop } from "react-dnd";
import { getOrder } from "../../services/actions";

import ConstructorIngredient from "../ConstructorIngredient/ConstructorIngredient";
import Modal from "../Modal/Modal";
import OrderDetails from "../OrderDetails/OrderDetails";
import { Redirect } from "react-router-dom";

const BurgerConstructor = () => {
  const userSuccess = useSelector(state => state.auth.userSuccess)
  const ids = useSelector((state) => state.ingredients.ingredientsId);
  const ingredients = useSelector(
    (state) => state.ingredients.ingredientsConstructor.ingredients
  );
  const buns = useSelector(
    (state) => state.ingredients.ingredientsConstructor.buns
  );
  const dispatch = useDispatch();

  const [isDisabled, setDisabled] = useState(true);

  const countTotalPrice = useMemo(() => {
    let totalPrice = 0;

    if (ingredients.length > 0 && Boolean(buns) === false) {
      setDisabled(true);
      return (totalPrice = ingredients.reduce(
        (acc, item) => acc + item.price,
        0
      ));
    } else if (ingredients.length > 0 && Boolean(buns) === true) {
      setDisabled(false);
      return (totalPrice =
        ingredients.reduce((acc, item) => acc + item.price, 0) +
        buns.price * 2);
    } else if (Boolean(buns) === true && ingredients.length === 0) {
      setDisabled(true);
      return (totalPrice = buns.price * 2);
    } else {
      setDisabled(true);
      return totalPrice;
    }
  }, [ingredients, buns]);

  const [isOpenOrder, setOpenOrder] = useState(false);
  
  const showModalOrder = () => {
    
    if(userSuccess){
      setOpenOrder(true);
      dispatch(getOrder(ids));
    }
   else{
      <Redirect
    to={{
      pathname: '/login'
    }}
  />  
   }
  };
  const closeModalOrder = () => {
    setOpenOrder(false);
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: "BurgerConstructor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];

    dispatch({
      type: REWRITE_INGREDIENTS,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
      dragCard: dragCard,
    });
  };

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
            ingredients.map((item, index) => (
              <ConstructorIngredient
                moveCard={moveCard}
                itemCard={item}
                key={item.key}
                id={item.key}
                index={ingredients.findIndex((el) => el.key === item.key)}
              />
            ))
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
          {countTotalPrice} <CurrencyIcon type="primary" />
        </p>
        <Button
          type="primary"
          size="medium"
          onClick={showModalOrder}
          disabled={isDisabled}
        >
          Оформить заказ
        </Button>
      </div>
      {isOpenOrder && (
        <Modal onClose={closeModalOrder} children={<OrderDetails />} />
      )}
    </div>
  );
};

export default BurgerConstructor;
