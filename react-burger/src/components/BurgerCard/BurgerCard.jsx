import { React, useState } from "react";
import styles from "./BurgerCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_ITEM_TO_ORDER, ADD_BUN_TO_ORDER } from "../../services/actions";
import { useDrag } from "react-dnd";
import { v4 as uuid } from "uuid";
import { useMemo } from "react";

const BurgerCard = (props) => {
  const ingredients = useSelector(
    (state) => state.ingredients.ingredientsConstructor.ingredients
  );
  const buns = useSelector(
    (state) => state.ingredients.ingredientsConstructor.buns
  );

  const ingredientCounter = useMemo(() => {
    let counter = 0;

    if (buns && buns._id === props.item._id) {
      counter = 2;
    }

    ingredients.forEach((ingredient) => {
      if (ingredient._id === props.item._id) counter++;
    });

    return counter;
  }, [ingredients, buns]);

  const dispatch = useDispatch();

  const [{ opacity }, ref] = useDrag({
    type: "card",
    item: props.item,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        if (item.type !== "bun") {
          dispatch({
            type: ADD_ITEM_TO_ORDER,
            payload: { ...item, key: uuid() },
          });
        } else {
          dispatch({ type: ADD_BUN_TO_ORDER, payload: props.item });
        }
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
      <li className="mb-10" ref={ref} style={{ opacity }}>
        {ingredientCounter !== 0 && (
          <Counter count={ingredientCounter} size="default" />
        )}

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
  item: ingredientTypes.isRequired,
};
export default BurgerCard;
