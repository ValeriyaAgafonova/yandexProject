import React from "react";
import Styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCard from "../BurgerCard/BurgerCard";
import PropTypes from "prop-types";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { SWITCH_MENU } from '../services/actions'


const BurgerIngredients = () => {

const activeMenu = useSelector(store => store.ingredients.activeMenu);

const dispatch = useDispatch();

const switchMenu = (event) => {
  console.log('switch')
dispatch({
  type: SWITCH_MENU,
  payload: event
})
}




const ingredients = useSelector(store => store.ingredients.itemsList)

// let observer = new IntersectionObserver((entries, options) => {
// entries.forEach(entry => {
//   let href = `${entry.target.getAttribute('id')}`;
//   if (entry.isIntersecting && entry.intersectionRatio >= 1) {
//   console.log(href)
//   }
// })
// }, {threshold: 1})
  
// document.querySelectorAll('h3').forEach(elem => {observer.observe(elem)})



  const typeBunArray = [];
  const typeMainArray = [];
  const typeSauceArray = [];

  for (const item in ingredients) {
    if (ingredients[item].type === "bun") {
      typeBunArray.push(ingredients[item]);
    } else if (ingredients[item].type === "main") {
      typeMainArray.push(ingredients[item]);
    } else {
      typeSauceArray.push(ingredients[item]);
    }
  }
  // const [current, setCurrent] = React.useState("Булки");

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
      <h2 className={`${Styles.head} text text_type_main-large`} >
        Соберите бургер
      </h2>
      <div className={Styles.menu}>
        <a href="#buns" id='bunsLink'>
        <Tab value="buns" active={activeMenu === 'buns'} onClick={switchMenu}>
          Булки
        </Tab>
        </a>
        <a href="#sauses" id='sausesLink'>
        <Tab value="sauses" active={activeMenu === 'sauses'} onClick={switchMenu}>
          Соусы
        </Tab>
        </a>
        <a href="#main" id='mainLink'>
        <Tab
          value="main"
          active={activeMenu === 'main'}
          onClick={switchMenu}
        >
          Начинки
        </Tab>
        </a>
      </div>
      <div className={`${Styles.container} custom-scroll`}>
        <section>
        <h3 className="text text_type_main-medium mt-10 is-active" id='buns'>Булки</h3>
        <ul>{bunItems}</ul>
        </section>
        <section>
        <h3 className="text text_type_main-medium" id='sauses'>Соусы</h3>
        <ul>{sauceItems}</ul>
        </section>
        <section>
        <h3 className="text text_type_main-medium" id='main'>Начинки</h3>
        <ul>{mainItems}</ul>
        </section>
      </div>
    </div>
  );
};

// BurgerIngredients.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientTypes).isRequired,
// };
export default React.memo(BurgerIngredients);
