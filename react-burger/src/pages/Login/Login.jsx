import { React } from "react";
import styles from "./Login.module.css";
import { useState, useRef } from "react";
import { PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import {
  Input,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router-dom";
import { getLogin } from "../../services/actions/auth";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const { loginAnswer } = useSelector((state) => state.auth);

  const inputRef = useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const [form, setValue] = useState({ email: "", password: "" });
  const onChange = (e) => {
    setValue({ ...form, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  function login(e) {
    e.preventDefault();
    getLogin(form, dispatch);
  }

  return (
    <div className={styles.loginContainer}>
      <form className={styles.formContainer} onSubmit={login}>
        <h2>Вход</h2>
        <Input
          type={"email"}
          placeholder={"email"}
          onChange={onChange}
          value={form.email}
          name={"email"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Ошибка"}
          size={"default"}
          width={"100%"}
        />
        <PasswordInput
          onChange={onChange}
          value={form.password}
          name={"password"}
          className={styles.email}
        />
        <Button type="primary" size="medium">
          Войти
        </Button>
      </form>
      <p>{loginAnswer}</p>
      <p>
        Вы - новый пользователь? <Link to="/register">Зарегистрироваться</Link>
      </p>
      <p>
        Забыли пароль? <Link to="/forgot-password">Восстановить пароль</Link>
      </p>
    </div>
  );
};

export default Login;
