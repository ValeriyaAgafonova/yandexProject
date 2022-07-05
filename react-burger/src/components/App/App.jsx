import { React } from "react";
import Styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItems } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Profile from "../Profile/Profile";
import NotFound from "../NotFound/NotFound";
import { Route, Switch } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ResetPassword from "../ResetPassword/ResetPassword";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";

function App() {
  let location = useLocation();
  let background = location.state && location.state.background;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getItems());
  }, [dispatch]);
console.log('app')
  return (
    <div className={Styles.App} id="app">
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact={true}>
          <div>
            <DndProvider backend={HTML5Backend}>
              <div className={Styles.main}>
                <BurgerIngredients />
                <BurgerConstructor />
              </div>
            </DndProvider>
          </div>
        </Route>
        <Route path="/login" exact={true}>
          <Login />
        </Route>
        <Route path="/register" exact={true}>
          <Register />
        </Route>
        <Route path="/reset-password" exact={true}>
          <ResetPassword />
        </Route>
        <Route path="/profile">
        <ProtectedRoute path='/login'>
          <Profile />
          </ProtectedRoute>
        </Route>
        <Route path="/forgot-password" exact={true}>
          <ForgotPassword />
        </Route>
        <Route path="/ingredient/:id" exact={true}>
          <IngredientDetails />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingredient/:id"
          children={<Modal children={<IngredientDetails />} />}
        />
      )}
    </div>
  );
}

export default App;
