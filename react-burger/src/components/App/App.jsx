import React from "react";
import Styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../services/actions";


function App() {
  const dispatch = useDispatch();
  const {itemsList, itemsRequest, itemsFailed} = useSelector(store => store.ingredients)
 
  useEffect(() => {
    dispatch(getItems());
}, []);


  return (
    <div className={Styles.App} id="app">
      <AppHeader />
      {itemsRequest && "Загрузка..."}
      {itemsFailed && "Произошла ошибка"}
      {!itemsRequest && !itemsFailed && itemsList.length && (
        <div>
          <div className={Styles.main}>
            <BurgerIngredients />
            <BurgerConstructor ingredients={itemsList} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
