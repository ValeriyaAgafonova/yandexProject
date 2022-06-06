import React from "react";
import Styles from "./IngredientDetails.module.css";
import ingredientTypes from "../../utils/types";
import { useSelector } from "react-redux";
const IngredientDetails = () => {
  const ingredientObject = useSelector(store => store.ingredients.ingredientObject[0])
  return (
    <div className={Styles.ingredientDetails}>
      <h3 className={`${Styles.head} text text_type_main-large`}>
        Детали ингредиента
      </h3>
      <img alt={ingredientObject.name} src={ingredientObject.image}></img>
      <p className="text text_type_main-medium">{ingredientObject.name}</p>
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
          {ingredientObject.calories}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {ingredientObject.proteins}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {ingredientObject.fat}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {ingredientObject.carbohydrates}
        </p>
      </div>
    </div>
  );
};
// IngredientDetails.propTypes = {
//   card: ingredientTypes,
// };
export default IngredientDetails;
