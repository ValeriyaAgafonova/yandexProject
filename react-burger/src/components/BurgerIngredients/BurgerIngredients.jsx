import React from 'react';
import Styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerCard from '../BurgerCard/BurgerCard'
import PropTypes from 'prop-types';

const BurgerIngredients = (props) => {
  console.log(props)
  let typeBunArray = [];
  let typeMainArray = [];
  let typeSauceArray = [];

  for (let item in props){
if (props[item].type === 'bun'){
  typeBunArray.push(props[item])
}
else if(props[item].type === 'main'){
  typeMainArray.push(props[item])
}
else{
  typeSauceArray.push(props[item])
}
  }
    const [current, setCurrent] = React.useState('Булки');
    const bunItems = typeBunArray.map((item, index)=>(
       <BurgerCard  key={item._id} item={item}/>
      ));
      const mainItems = typeMainArray.map((item, index)=>(
        <BurgerCard  key={item._id} item={item}/>
       ));
       const sauceItems = typeSauceArray.map((item, index)=>(
        <BurgerCard  key={item._id} item={item}/>
       ));
    return(
       <div className={Styles.left}>
           <h2 className ='text text_type_main-large' style = {{margin: '60px 0 20px'}}>Соберите бургер</h2>
           <div style={{ display: 'flex' }}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
       Булки
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
    <div className={`${Styles.container} custom-scroll`}>
    <h3 className="text text_type_main-medium mt-10">Булки</h3>
    <ul>
          {bunItems}
      </ul>
      <h3 className="text text_type_main-medium">Соусы</h3>
      <ul>
          {sauceItems}
      </ul>
<h3 className="text text_type_main-medium">Начинки</h3>
<ul>
          {mainItems}
      </ul>
    
       </div>
       </div>
    )

}
BurgerIngredients.propTypes = {
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
export default React.memo(BurgerIngredients);