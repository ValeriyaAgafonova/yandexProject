import React from "react";
import Styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const AppHeader = () => {
  return (
    <header>
      <div className={Styles.left}>
        <a href="#">
          {" "}
          <BurgerIcon type="primary" /> <p>Конструктор</p>
        </a>
        <a href="#">
          {" "}
          <ListIcon type="secondary" />
          <p className="text text_type_main-default text_color_inactive">
            {" "}
            Лента заказов
          </p>
        </a>
      </div>
      <Logo />
      <a href="#" className={Styles.right}>
        <ProfileIcon type="secondary" />
        <p className="text text_type_main-default text_color_inactive">
          Личный кабинет
        </p>
      </a>
    </header>
  );
};
export default React.memo(AppHeader);
