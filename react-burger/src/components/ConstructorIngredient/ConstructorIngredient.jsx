import React from "react";
import Styles from "./ConstructorIngredient.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DELETE_ITEM_FROM_CONSTRUCTOR, COUNT_TOTAL_PRICE } from "../services/actions";
import { useDispatch } from "react-redux";
import ingredientTypes from "../../utils/types";

const ConstructorIngredient = ({item}) => {
  const dispatch = useDispatch();
  const deleteItem = () => {
    console.log("delete");
      dispatch({type: DELETE_ITEM_FROM_CONSTRUCTOR,
        payload: item.key
      })
      dispatch({type: COUNT_TOTAL_PRICE,
    payload: item
})
  };

  return (
    <div
      className={Styles.containerIngredient}
    >
      <div className={Styles.drag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
        handleClose={deleteItem}
      />
    </div>
  );
};
ConstructorIngredient.propTypes = {
    item: ingredientTypes,
  };
export default ConstructorIngredient;
