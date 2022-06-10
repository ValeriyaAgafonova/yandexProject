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
} from "../services/actions";
import { useDrag } from "react-dnd";
import { v4 as uuid } from "uuid";

const BurgerCard = (props) => {

// const [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

  const showModalIngredient = () => {
    dispatch({ type: SET_OPEN_INGREDIENT, payload: props.item });
  };
  const [{ opacity }, ref] = useDrag({
    type: "card",
    item: props.item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        if (item.type !== "bun") {
          console.log(props.item);
          props.item.key = uuid();
          props.item.counter += 1;
          dispatch({
            type: ADD_ITEM_TO_ORDER,
            payload: { ...item, key: uuid() },
          });
        } else {
          console.log("else");
          dispatch({ type: ADD_BUN_TO_ORDER, payload: props.item });
          props.item.counter = 2;
        }
        dispatch({ type: COUNT_TOTAL_PRICE, payload: props.item });
        dispatch({ type: COUNT_NUMBER_ITEMS, payload: props.item });
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
        {props.item.counter !== 0 && <Counter count={props.item.counter} size="default" />}
        <img src={props.item.image} alt={props.item.name}></img>
        <p className="text text_type_digits-default mt-1">
          {props.item.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default mt-2">{props.item.name}</p>
      </li>
    </>
  );
};

 
BurgerCard.propTypes = {
  item: ingredientTypes,
};
export default BurgerCard;
