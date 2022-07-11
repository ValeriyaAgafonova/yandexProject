import React from "react";
import Styles from "./AppHeader.module.css";
import { Logo } from "@ya.praktikum/react-developer-burger-ui-components";
import { BurgerIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ListIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ProfileIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

const AppHeader = () => {
  return (
    <header>
      <div className={Styles.left}>
        <NavLink
          to="/"
          exact
          className={`${Styles.inactive} ${Styles.flex}  text text_type_main-default`}
          activeClassName={Styles.active}
        >
          <BurgerIcon type="primary" /> <p> Конструктор</p>
        </NavLink>

        <NavLink
          to="/profile/orders"
          exact
          className={`${Styles.inactive} ${Styles.flex}  text text_type_main-default`}
          activeClassName={Styles.active}
        >
          <ListIcon type="secondary" />
          <p> Лента заказов</p>
        </NavLink>
      </div>
      <NavLink to="/" exact>
        <Logo />
      </NavLink>

      <div className={Styles.right}>
        <NavLink
          to="/profile"
          exact
          className={`${Styles.inactive} ${Styles.flex} text text_type_main-default`}
          activeClassName={Styles.active}
        >
          <ProfileIcon type="secondary" />

          <p>Личный кабинет</p>
        </NavLink>
      </div>
    </header>
  );
};
export default React.memo(AppHeader);
