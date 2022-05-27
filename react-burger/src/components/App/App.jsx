import React from "react";
import Styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useState } from "react";
import Modal from "../Modal/Modal";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import OrderDetails from "../OrderDetails/OrderDetails";
// import data from '../../utils/data';
const url = "https://norma.nomoreparties.space/api/ingredients";


function App() {
  //состояние и функции открытия попапа с деталями заказа
  const [isOpenOrder, setOpenOrder] = useState(false);
  const showModalOrder = () => {
    setOpenOrder(true)
  };
const closeModalOrder = () => {
  setOpenOrder(false)
}

//состояние и функции открытия попапа с составом
const [isOpenIngredient, setOpenIngredient] = useState(false)
const showModalIngredient = () => {
  setOpenIngredient(true)
};
const closeModalIngredient = () => {
setOpenIngredient(false)
}
const elementRef = React.useRef(null)


React.useEffect(() => {
  const onClick = (e) => {
   console.log(elementRef.current)
     if(e.target.localName === 'button'){
          return showModalOrder()
      }

  };
  document.addEventListener("click", onClick);
  return () => {
    document.removeEventListener("click", onClick);
  };
}, []);
  const [state, setState] = useState({
    isLoading: false,
    hasError: false,
    data: [],
  });
  useEffect(() => {
    getIngredients();
  }, []);

const checkResponse = (response) => {
    if(response.ok) {
      return response.json()
    } else {
      return Promise.reject(`Ошибка ${response.status}`);
    }
  };


  const getIngredients = () => {
     setState({ ...state, hasError: false, isLoading: true });
     fetch(url).then(checkResponse).then(function(data) {
      setState({ ...state, data: data.data, isLoading: false })
    })
    .catch((e) => {
            setState({ ...state, hasError: true, isLoading: false });
          });
      };
  
  
  const { data, isLoading, hasError } = state;

  return (
    <div className={Styles.App} id="app" ref={elementRef}>
      <AppHeader />
      {isLoading && "Загрузка..."}
      {hasError && "Произошла ошибка"}
      {!isLoading && !hasError && data.length && (
        <div>
          <div className={Styles.main}>
            <BurgerIngredients ingredients={data} show={showModalOrder}/>
            <BurgerConstructor ingredients={data} show={showModalOrder}/>
          </div>
        </div>
      )}
            {isOpenOrder && <Modal onClose={closeModalOrder} children={<OrderDetails />}/>}
            {isOpenIngredient && <Modal onClose={closeModalOrder} children={<IngredientDetails />}/>}

    </div>
  );
}

export default App;

