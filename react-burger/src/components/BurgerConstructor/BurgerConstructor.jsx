import React, { useState } from "react";
import Styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import Modal from "../Modal/Modal";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import OrderDetails from "../OrderDetails/OrderDetails";

const BurgerConstructor = (props) => {
//   const [isOpen, setOpen] = useState(false);

//   // const items = [];
//   // for (const item of props.ingredients) {
//   //   items.push(props.ingredients[item]);
//   // }

//   const showModal = () => {
//     setOpen(true)
//   };
// const closeModal = () => {
//   setOpen(false)
// }
  return (
    <div className={Styles.right}>
      <div className={Styles.container}>
        <div className={Styles.margin}>
        <ConstructorElement
         key={props.ingredients[0]._id}
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={1255}
          thumbnail={props.ingredients[0].image}
        />
        </div>
        <div className={`${Styles.ingredients} custom-scroll`}>
          {props.ingredients.map(
            (item, index) =>
              item.type !== "bun" && (
                <div className={Styles.containerIngredient}>
                  <div className={Styles.drag}>
              <DragIcon  type="primary"/>
              </div>
                <ConstructorElement
                  key={item._id}
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
              />
              
              </div>
              )
              
          )}
        </div>
        <div className={Styles.margin}>
        <ConstructorElement
         key={props.ingredients[0]._id}
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={1255}
          thumbnail={props.ingredients[0].image}
        />
        </div>
      </div>
      <div className={Styles.amount}>
        <p className="text text_type_digits-medium">
          12342 <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
      {/* {isOpen && <Modal onclose={closeModal} children={<OrderDetails />}/>} */}
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientTypes)
};

export default React.memo(BurgerConstructor);
