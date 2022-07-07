import { React } from "react";
import Styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerConstructor from "../../pages/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../pages/BurgerIngredients/BurgerIngredients";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getItems } from "../../services/actions";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Profile from "../../pages/Profile/Profile";
import NotFound from "../../pages/NotFound/NotFound";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";
import ResetPassword from "../../pages/ResetPassword/ResetPassword";
import ForgotPassword from "../../pages/ForgotPassword/ForgotPassword";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute";
import { checkAuth } from "../../services/actions/auth";
function App() {
  const history = useHistory();
  const back = (e) => {
    e.stopPropagation();
    history.goBack();
  };

  const location = useLocation();
  const background = location.state && location.state.background;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems());
    checkAuth(dispatch);
  }, []);

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
        <ProtectedRoute onlyForAuth={true} path="/login" exact={true}>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={true} path="/register" exact={true}>
          <Register />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={true} path="/reset-password" exact={true}>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/profile">
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute onlyForAuth={true} path="/forgot-password" exact={true}>
          <ForgotPassword />
        </ProtectedRoute>
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
          children={<Modal children={<IngredientDetails />} onClose={back} />}
        />
      )}
    </div>
  );
}

export default App;
