import React from 'react';
import Styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredients = () => {
    const [current, setCurrent] = React.useState('Булки');
    
    return(
       <div className={Styles.left}>
           <h2 className ='text text_type_main-large' style = {{margin: '40px 0 20px'}}>Соберите бургер</h2>
           <div style={{ display: 'flex' }}>
      <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
        One
      </Tab>
      <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
        Two
      </Tab>
      <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
        Three
      </Tab>
    </div>
    <div>
        
    </div>
       </div>
    )

}
export default React.memo(BurgerIngredients);