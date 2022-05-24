import React from 'react';
import Styles from'./App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import data from '../../utils/data';
function App() {
  return (
    <div className={Styles.App}>
    <AppHeader/>
    <div className={Styles.main}>
      <BurgerIngredients {...data}/>
      <BurgerConstructor {...data}/>
    </div>
    </div>
  );
}

export default App;
