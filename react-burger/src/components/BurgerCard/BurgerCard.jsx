import { React, useEffect, useState } from "react";
import styles from "./BurgerCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import {
  SET_OPEN_INGREDIENT,
  ADD_ITEM_TO_ORDER,
  ADD_BUN_TO_ORDER,
  COUNT_TOTAL_PRICE,
  COUNT_NUMBER_ITEMS,
} from "../../services/actions";
import { useDrag } from "react-dnd";
import { v4 as uuid } from "uuid";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

const BurgerCard = (props) => {

  const [isOpenIngredient, setOpenIngredient] = useState(false);
  const showModalIngredient = () => {
    setOpenIngredient(true);
  };
  const closeModalIngredient = () => {
    setOpenIngredient(false);
  };

  let [counter, setCounter] = useState(0);

const plusCounterIngredient = () => {
  setCounter(counter = counter +1)
}
const plusCounterBun = () => {
  setCounter(2)
}
const minusCounterIngredient = () => {
  setCounter(counter = counter - 1)
}
const minusCounterBun = () => {
  setCounter(0)
}

  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: "card",
    item: props.item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.type !== "bun") {
          console.log('if')
          plusCounterIngredient()
          dispatch({
            type: ADD_ITEM_TO_ORDER,
            payload: { ...item, key: uuid() },
          });
  
        } else {
          console.log("else");
          dispatch({ type: ADD_BUN_TO_ORDER, payload: props.item });
          plusCounterBun()
        }
        // dispatch({ type: COUNT_TOTAL_PRICE, payload: props.item });
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <>
      <li
        className="mb-10"
        onClick={showModalIngredient}
        ref={ref}
        style={{ opacity }}
      >
        {counter !== 0 && <Counter count={counter} size="default" />}
        <img src={props.item.image} alt={props.item.name}></img>
        <p className="text text_type_digits-default mt-1">
          {props.item.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default mt-2">{props.item.name}</p>
      </li>
      {isOpenIngredient && (
        <Modal
          onClose={closeModalIngredient}
          children={<IngredientDetails card={props.item} />}
        />
      )}
    </>
  );
};

 
BurgerCard.propTypes = {
  item: ingredientTypes.isRequired,
};
export default BurgerCard;
