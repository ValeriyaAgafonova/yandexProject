import React from "react";
import Styles from "./IngredientDetails.module.css";
import ingredientTypes from "../../utils/types";
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";

const IngredientDetails = (props) => {
  
  const { itemsList, itemsRequest, itemsFailed } = useSelector(
    (store) => store.ingredients
  );
  let { id } = useParams();
  let image = itemsList.filter(item => item._id === id);
  return (
    <>
    {!itemsRequest && !itemsFailed && itemsList.length && (
    <div className={Styles.ingredientDetails}>
      <h3 className={`${Styles.head} text text_type_main-large`}>
        Детали ингредиента
      </h3>
      <img alt={image[0].name} src={image[0].image}></img>
      <p className="text text_type_main-medium">{image[0].name}</p>
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
          {image[0].calories}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {image[0].proteins}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {image[0].fat}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {image[0].carbohydrates}
        </p>
      </div>
    </div>
    )}
    </>
  );
};

export default IngredientDetails;
