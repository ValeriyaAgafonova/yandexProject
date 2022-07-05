import styles from "./Profile.module.css";
import { useState, useRef } from "react";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  useRouteMatch,
  Link,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSaveChanges } from "../../services/actions";
const Profile = () => {
  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);

  const {saveSuccess, saveAnswer } = useSelector((state) => state.auth);
const dispatch = useDispatch()
  let { path, url } = useRouteMatch();

  const [current, setCurrent] = useState("Профиль");

  const [form, setValue] = useState({
    email: userEmail,
    password: "",
    name: userName,
  });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
    buttonSave.current.style.opacity = 1;
  };

  const inputRef = useRef(null);
  const buttonSave = useRef(null);
  const onIconClick = () => {
    inputRef.current.focus();
  };
  function saveChanges(e){
    e.preventDefault()
    getSaveChanges(form, dispatch)
    }
const resetChanges = (e) =>{
e.preventDefault()
setValue({ ...form,  email: userEmail,
    password: "",
    name: userName});
    buttonSave.current.style.opacity = 0;
}
  return (
    <div className={styles.profileContainer}>
      <div className={styles.categories}>
        <Link to={url}>
          <Tab
            value="Профиль"
            active={current === "Профиль"}
            onClick={setCurrent}
          >
            Профиль
          </Tab>
        </Link>
        <Link to={`${url}/orders`}>
          <Tab
            value="История заказов"
            active={current === "История заказов"}
            onClick={setCurrent}
          >
            История заказов
          </Tab>
        </Link>
        <Link to={`${url}/exit`}>
          <Tab value="Выход" active={current === "Выход"} onClick={setCurrent}>
            Выход
          </Tab>
        </Link>
      </div>

      <div className={styles.changeContainer}>
        <Switch>
          <Route exact path={path}>
            <form className={styles.changeContainer} onSubmit={saveChanges}>
              <Input
                type={"text"}
                placeholder={"Имя"}
                onChange={onChange}
                value={form.name}
                icon={"EditIcon"}
                name={"name"}
                error={false}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
              />

              <Input
                type={"email"}
                placeholder={"email"}
                onChange={onChange}
                value={form.email}
                name={"email"}
                error={false}
                icon={"EditIcon"}
                ref={inputRef}
                onIconClick={onIconClick}
                errorText={"Ошибка"}
                size={"default"}
              />
              <PasswordInput
                onChange={onChange}
                value={form.password}
                name={"password"}
                className={styles.email}
              />

              <div className={styles.changeButtons} ref={buttonSave}>
                <Button>Сохранить</Button>
                <Button onClick={resetChanges}>Отменить</Button>
              </div>
            </form>
            <p>{saveAnswer}</p>
          </Route>
          <Route path={`${path}/orders`}>
            <p>orders</p>
          </Route>
          <Route path={`${path}/exit`}>
            <p>exit</p>
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Profile;
