import React from "react";
import styles from "./BurgerCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState } from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import { isPropertySignature } from "typescript";


const BurgerCard = (props) => {

  // const [isOpen, setOpen] = useState(false);

  // const openModal = () => {
  //   setOpen(true);
  // };
  // const closeModal= () => {
  //   setOpen(false)
  // }

  return (
    <li className="mb-10">
      <Counter count={1} size="default" />
      <img src={props.item.image} alt={props.item.name}></img>
      <p className="text text_type_digits-default mt-1">
        {props.item.price} <CurrencyIcon type="primary" />
      </p>
      <p className="text text_type_main-default mt-2">{props.item.name}</p>
      {/* {isOpen && <Modal data={item} onClose = {closeModal} children={<IngredientDetails card={item}/>}/>} */}
    </li>
  );
};

export default BurgerCard;
