import { React, useState } from "react";
import Styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {

  const dispatch = useDispatch();
  
  const {
    itemsList,
    itemsRequest,
    itemsFailed,
  } = useSelector((store) => store.ingredients);

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
          <DndProvider backend={HTML5Backend}>
            <div className={Styles.main}>
              <BurgerIngredients />
              <BurgerConstructor />
            </div>
          </DndProvider>
        </div>
      )}
    </div>
  );
}

export default App;
