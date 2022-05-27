import React from "react";
import Styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCard from "../BurgerCard/BurgerCard";
import PropTypes from "prop-types";
import ingredientTypes from "../../utils/types";

const BurgerIngredients = (props) => {
  const typeBunArray = [];
  const typeMainArray = [];
  const typeSauceArray = [];

  for (const item in props.ingredients) {
    if (props.ingredients[item].type === "bun") {
      typeBunArray.push(props.ingredients[item]);
    } else if (props.ingredients[item].type === "main") {
      typeMainArray.push(props.ingredients[item]);
    } else {
      typeSauceArray.push(props.ingredients[item]);
    }
  }
  const [current, setCurrent] = React.useState("Булки");
  const bunItems = typeBunArray.map((item, index) => (
    <BurgerCard key={item._id} item={item} />
  ));
  const mainItems = typeMainArray.map((item, index) => (
    <BurgerCard key={item._id} item={item} />
  ));
  const sauceItems = typeSauceArray.map((item, index) => (
    <BurgerCard key={item._id} item={item} />
  ));
  return (
    <div className={Styles.left}>
      <h2 className={`${Styles.head} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <div className={Styles.menu}>
        <Tab value="Булки" active={current === "Булки"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="Соусы" active={current === "Соусы"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab
          value="Начинки"
          active={current === "Начинки"}
          onClick={setCurrent}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${Styles.container} custom-scroll`}>
        <h3 className="text text_type_main-medium mt-10">Булки</h3>
        <ul>{bunItems}</ul>
        <h3 className="text text_type_main-medium">Соусы</h3>
        <ul>{sauceItems}</ul>
        <h3 className="text text_type_main-medium">Начинки</h3>
        <ul>{mainItems}</ul>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientTypes),
};
export default React.memo(BurgerIngredients);
