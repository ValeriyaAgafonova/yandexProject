import React from "react";
import styles from "./BurgerCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { SET_OPEN_INGREDIENT, SET_CLOSE_INGREDIENT } from '../services/actions'
const BurgerCard = (props) => {
  //состояние и функции открытия попапа с составом
  // const [isOpenIngredient, setOpenIngredient] = useState(false);
  // const showModalIngredient = () => {
  //   setOpenIngredient(true);
  // };
  // const closeModalIngredient = () => {
  //   setOpenIngredient(false);
  // };

  const dispatch = useDispatch();
const  modalIngredientOpen = useSelector(store => store.ingredients.modalIngredientOpen)

const showModalIngredient = () => {
  console.log('show')
    dispatch({type: SET_OPEN_INGREDIENT,
      id: props.item._id
    })
  };
  const closeModalIngredient = () => {
    dispatch({type: SET_CLOSE_INGREDIENT,
    id: props.item.id
  });
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
      {modalIngredientOpen && (
        <Modal
          onClose={closeModalIngredient}
          children={<IngredientDetails />}
        />
      )}
    </>
  );
};
BurgerCard.propTypes = {
  item: ingredientTypes,
};
export default BurgerCard;
