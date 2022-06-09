import React from "react";
import Styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { SET_OPEN_ORDER } from '../services/actions';
import { useDrop } from 'react-dnd';


const BurgerConstructor = (props) => {
  const totalPrice = useSelector(state => state.ingredients.totalPrice)
  const ingredients = useSelector(state => state.ingredients.ingredients)
 const buns = useSelector(state=> state.ingredients.buns)
  const dispatch = useDispatch();

  const showModalOrder = () => {
    dispatch({type: SET_OPEN_ORDER
    })
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: 'card',
    drop: () => ({ name: 'BurgerConstructor' }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }))


  return (
    <div className={Styles.right}>
      <div className={Styles.container}>
        <div className={Styles.margin}>
          {buns === null ? <div className={`${Styles.construct} ${Styles.constructorTop}`}>
<p>Выберите булку</p>
</div> : 
          <ConstructorElement
            type="top"
            isLocked={true}
            text={buns.name}
            price={buns.price}
            thumbnail={buns.image}
          />
  }
        </div>
        <div className={`${Styles.ingredients} custom-scroll`} ref={drop}>
          { ingredients.length === 0 ? <div className={Styles.construct}>
<p>Выберите начинку</p>
</div> : 
 ingredients.map(
            (item, index) =>
              item.type !== "bun" && (
                <div className={Styles.containerIngredient} key={item._id}>
                  <div className={Styles.drag}>
                    <DragIcon type="primary" />
                  </div>
                  <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                  />
                </div>
              )
          )}
          
        </div>
        <div className={Styles.margin}>
        {buns === null ? <div className={`${Styles.construct} ${Styles.constructorBottom}`}>
<p>Выберите булку</p>
</div> : 
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={buns.name}
            price={buns.price}
            thumbnail={buns.image}
          />
              }
        </div>
      </div>
      <div className={Styles.amount}>
        <p className="text text_type_digits-medium">
          {totalPrice} <CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="medium" onClick={showModalOrder}>
          Оформить заказ
        </Button>
      </div>
    </div>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientTypes).isRequired,
};

export default React.memo(BurgerConstructor);
