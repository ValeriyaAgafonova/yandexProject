import { React, useEffect, useState } from "react";
import Styles from "./BurgerIngredients.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerCard from "../../components/BurgerCard/BurgerCard";
import { useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const BurgerIngredients = () => {
  const location = useLocation();
  const itemsList = useSelector((store) => store.ingredients.itemsList);

  const [current, setCurrent] = useState("buns");

  const { ref: ref1, inView: inViewBuns } = useInView({
    threshold: 0,
  });
  const { ref: ref2, inView: inViewSauses } = useInView({
    threshold: 0,
  });
  const { ref: ref3, inView: inViewMain } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrent("buns");
    } else if (inViewSauses) {
      setCurrent("sauses");
    } else if (inViewMain) {
      setCurrent("main");
    }
  }, [inViewSauses, inViewBuns, inViewMain]);

  const typeBunArray = [];
  const typeMainArray = [];
  const typeSauceArray = [];

  for (const item in itemsList) {
    if (itemsList[item].type === "bun") {
      typeBunArray.push(itemsList[item]);
    } else if (itemsList[item].type === "main") {
      typeMainArray.push(itemsList[item]);
    } else {
      typeSauceArray.push(itemsList[item]);
    }
  }

  const bunItems = typeBunArray.map((item, index) => (
    <Link
      className={Styles.list}
      key={item._id}
      to={{
        pathname: `/ingredient/${item._id}`,

        state: { background: location },
      }}
    >
      <BurgerCard key={item._id} item={item} />
    </Link>
  ));
  const mainItems = typeMainArray.map((item, index) => (
    <Link
      className={Styles.list}
      key={item._id}
      to={{
        pathname: `/ingredient/${item._id}`,

        state: { background: location },
      }}
    >
      <BurgerCard key={item._id} item={item} />
    </Link>
  ));
  const sauceItems = typeSauceArray.map((item, index) => (
    <Link
      key={item._id}
      className={Styles.list}
      to={{
        pathname: `/ingredient/${item._id}`,

        state: { background: location },
      }}
    >
      <BurgerCard key={item._id} item={item} />
    </Link>
  ));
  return (
    <div className={Styles.left}>
      <h2 className={`${Styles.head} text text_type_main-large`}>
        Соберите бургер
      </h2>
      <div className={Styles.menu}>
        <a href="#buns" id="bunsLink">
          <Tab value="buns" active={current === "buns"} onClick={setCurrent}>
            Булки
          </Tab>
        </a>
        <a href="#sauses" id="sausesLink">
          <Tab
            value="sauses"
            active={current === "sauses"}
            onClick={setCurrent}
          >
            Соусы
          </Tab>
        </a>
        <a href="#main" id="mainLink">
          <Tab value="main" active={current === "main"} onClick={setCurrent}>
            Начинки
          </Tab>
        </a>
      </div>
      <div className={`${Styles.container} custom-scroll`}>
        <section inview={inViewBuns.toString()}>
          <h3
            ref={ref1}
            className="text text_type_main-medium mt-10 is-active"
            id="buns"
          >
            Булки
          </h3>
          <ul>{bunItems}</ul>
        </section>
        <section inview={inViewSauses.toString()}>
          <h3 ref={ref2} className="text text_type_main-medium" id="sauses">
            Соусы
          </h3>
          <ul>{sauceItems}</ul>
        </section>

        <section inview={inViewMain.toString()}>
          <h3 ref={ref3} className="text text_type_main-medium" id="main">
            Начинки
          </h3>
          <ul>{mainItems}</ul>
        </section>
      </div>
    </div>
  );
};

export default BurgerIngredients;
