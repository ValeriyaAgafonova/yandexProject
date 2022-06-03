import React from "react";
import Styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useState } from "react";
// import data from '../../utils/data';
const url = "https://norma.nomoreparties.space/api/ingredients";

function App() {
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  useEffect(() => {
    getIngredients();
  }, []);

  const checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status}`);
    }
  };

  const getIngredients = () => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(url)
      .then(checkResponse)
      .then(function (data) {
        setState({ ...state, data: data.data, isLoading: false });
      })
      .catch((e) => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  };

  const { data, isLoading, hasError } = state;

  return (
    <div className={Styles.App} id="app">
      <AppHeader />
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {!isLoading && !hasError && data.length && (
        <div>
          <div className={Styles.main}>
            <BurgerIngredients ingredients={data} />
            <BurgerConstructor ingredients={data} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
