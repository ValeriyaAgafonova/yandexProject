import React from 'react';
import Styles from'./App.module.css';
import AppHeader from '../AppHeader/AppHeader';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <div className={Styles.App}>
    <AppHeader/>
    <div className={Styles.main}>
      <BurgerIngredients />
      <BurgerConstructor />
    </div>
    </div>
  );
}

export default App;
