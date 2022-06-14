import React from "react";
import Styles from "./ConstructorIngredient.module.css";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import { DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { DELETE_ITEM_FROM_CONSTRUCTOR } from "../../services/actions";
import { useDispatch } from "react-redux";
import ingredientTypes from "../../utils/types";
import { useDrop, useDrag } from "react-dnd";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { hover } from "@testing-library/user-event/dist/hover";
import PropTypes from "prop-types";

const ConstructorIngredient = ({ itemCard, moveCard, id, index }) => {
  const ref = useRef(null);
  const ingredients = useSelector(
    (state) => state.ingredients.ingredientsConstructor.ingredients
  );

  const dispatch = useDispatch();
  const deleteItem = () => {
    dispatch({ type: DELETE_ITEM_FROM_CONSTRUCTOR, payload: itemCard.key });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      item.index = index;
      moveCard(dragIndex, hoverIndex);
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <div ref={ref} className={Styles.containerIngredient} style={{ opacity }}>
      <div className={Styles.drag}>
        <DragIcon type="primary" />
      </div>
      <ConstructorElement
        text={itemCard.name}
        price={itemCard.price}
        thumbnail={itemCard.image}
        handleClose={deleteItem}
      />
    </div>
  );
};
ConstructorIngredient.propTypes = {
  itemCard: ingredientTypes.isRequired,
  moveCard: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
export default ConstructorIngredient;
