
import React from 'react';
import Styles from './IngredientDetails.module.css'
import PropTypes from 'prop-types';


const IngredientDetails = (props) => {

return(
    <div className={Styles.ingredientDetails}>
    <h3 className={`${Styles.head} text text_type_main-large`}>Детали ингредиента</h3>
    <img alt='ingredient' src={props.image}></img>
    <p className="text text_type_main-medium">{props.name}</p>
    <div className={Styles.table}>
<p className="text text_type_main-default text_color_inactive">Калории,ккал</p>
<p className="text text_type_main-default text_color_inactive">Белки, г</p>
<p className="text text_type_main-default text_color_inactive">Жиры, г</p>
<p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
<p className="text text_type_main-default text_color_inactive">{props.calories}</p>
<p className="text text_type_main-default text_color_inactive">{props.proteins}</p>
<p className="text text_type_main-default text_color_inactive">{props.fat}</p>
<p className="text text_type_main-default text_color_inactive">{props.carbohydrates}</p>

    </div>


    </div>
)
}
IngredientDetails.propTypes = {
    calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  proteins: PropTypes.number,
  type: PropTypes.string,
  __v: PropTypes.number,
  _id: PropTypes.string,
  }
export default IngredientDetails