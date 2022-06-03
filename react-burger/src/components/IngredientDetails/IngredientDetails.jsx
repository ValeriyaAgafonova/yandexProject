import React from "react";
import Styles from "./IngredientDetails.module.css";
import ingredientTypes from "../../utils/types";

const IngredientDetails = (props) => {
  return (
    <div className={Styles.ingredientDetails}>
      <h3 className={`${Styles.head} text text_type_main-large`}>
        Детали ингредиента
      </h3>
      <img alt={props.card.name} src={props.card.image}></img>
      <p className="text text_type_main-medium">{props.card.name}</p>
      <div className={Styles.table}>
        <p className="text text_type_main-default text_color_inactive">
          Калории,ккал
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Белки, г
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Жиры, г
        </p>
        <p className="text text_type_main-default text_color_inactive">
          Углеводы, г
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {props.card.calories}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {props.card.proteins}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {props.card.fat}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {props.card.carbohydrates}
        </p>
      </div>
    </div>
  );
};
IngredientDetails.propTypes = {
  card: ingredientTypes,
};
export default IngredientDetails;
