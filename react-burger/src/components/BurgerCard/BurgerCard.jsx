import React from "react";
import styles from "./BurgerCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ingredientTypes from "../../utils/types";

const BurgerCard = (props) => {
  //состояние и функции открытия попапа с составом
  const [isOpenIngredient, setOpenIngredient] = useState(false);
  const showModalIngredient = () => {
    setOpenIngredient(true);
  };
  const closeModalIngredient = () => {
    setOpenIngredient(false);
  };

  return (
    <>
      <li className="mb-10" onClick={showModalIngredient}>
        <Counter count={1} size="default" />
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
  item: ingredientTypes,
};
export default BurgerCard;
