import { React, useState, useMemo } from "react";
import Styles from "./BurgerConstructor.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { REWRITE_INGREDIENTS } from "../../services/actions/index";
import { useDrop } from "react-dnd";
import { getOrder } from "../../services/actions/index";
import ConstructorIngredient from "../../components/ConstructorIngredient/ConstructorIngredient";
import Modal from "../../components/Modal/Modal";
import OrderDetails from "../../components/OrderDetails/OrderDetails";
import { useHistory } from "react-router-dom";

const BurgerConstructor = () => {
  const userName = useSelector((state) => state.auth.userName);
  const ids = useSelector((state) => state.ingredients.ingredientsId);
  const ingredients = useSelector(
    (state) => state.ingredients.ingredientsConstructor.ingredients
  );
  const buns = useSelector(
    (state) => state.ingredients.ingredientsConstructor.buns
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const [isDisabled, setDisabled] = useState(true);

  const countTotalPrice = useMemo(() => {
    let totalPrice = 0;

    if (ingredients.length > 0 && Boolean(buns) === false) {
      setDisabled(true);
      return (totalPrice = ingredients.reduce(
        (acc, item) => acc + item.price,
        0
      ));
    } else if (ingredients.length > 0 && Boolean(buns) === true) {
      setDisabled(false);
      return (totalPrice =
        ingredients.reduce((acc, item) => acc + item.price, 0) +
        buns.price * 2);
    } else if (Boolean(buns) === true && ingredients.length === 0) {
      setDisabled(true);
      return (totalPrice = buns.price * 2);
    } else {
      setDisabled(true);
      return totalPrice;
    }
  }, [ingredients, buns]);

  const [isOpenOrder, setOpenOrder] = useState(false);

  const showModalOrder = () => {
    if (!userName) {
      history.push("/login");
      return;
    }

    dispatch(getOrder(ids));
    setOpenOrder(true);
  };

  const closeModalOrder = () => {
    setOpenOrder(false);
  };

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: "BurgerConstructor" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];

    dispatch({
      type: REWRITE_INGREDIENTS,
      dragIndex: dragIndex,
      hoverIndex: hoverIndex,
      dragCard: dragCard,
    });
  };

  return (
    <div className={Styles.right} ref={drop}>
      <div className={Styles.container}>
        <div className={Styles.margin}>
          {buns === null ? (
            <div className={`${Styles.construct} ${Styles.constructorTop}`}>
              <p>???????????????? ??????????</p>
            </div>
          ) : (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${buns.name}(????????)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          )}
        </div>
        <div className={`${Styles.ingredients} custom-scroll`}>
          {ingredients.length === 0 ? (
            <div className={`${Styles.construct} ${Styles.constructMargin}`}>
              <p>???????????????? ??????????????</p>
            </div>
          ) : (
            ingredients.map((item, index) => (
              <ConstructorIngredient
                moveCard={moveCard}
                itemCard={item}
                key={item.key}
                id={item.key}
                index={ingredients.findIndex((el) => el.key === item.key)}
              />
            ))
          )}
        </div>
        <div className={Styles.margin}>
          {buns === null ? (
            <div className={`${Styles.construct} ${Styles.constructorBottom}`}>
              <p>???????????????? ??????????</p>
            </div>
          ) : (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${buns.name}(??????)`}
              price={buns.price}
              thumbnail={buns.image}
            />
          )}
        </div>
      </div>
      <div className={Styles.amount}>
        <p className="text text_type_digits-medium">
          {countTotalPrice} <CurrencyIcon type="primary" />
        </p>

        <Button
          type="primary"
          size="medium"
          onClick={showModalOrder}
          disabled={isDisabled}
        >
          ???????????????? ??????????
        </Button>
      </div>
      {isOpenOrder && (
        <Modal onClose={closeModalOrder} children={<OrderDetails />} />
      )}
    </div>
  );
};

export default BurgerConstructor;
