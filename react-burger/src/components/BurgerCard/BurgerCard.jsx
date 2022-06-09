import React from "react";
import styles from "./BurgerCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientTypes from "../../utils/types";
import { useDispatch } from "react-redux";
import { SET_OPEN_INGREDIENT, ADD_ITEM_TO_ORDER} from '../services/actions'
import { useDrag } from 'react-dnd';

const BurgerCard = (props) => {
 
  const dispatch = useDispatch();

  const showModalIngredient = () => {
    dispatch({type: SET_OPEN_INGREDIENT,
      payload: props.item
    })
  };
  const [{ opacity }, ref] = useDrag({
    type: 'card',
    item: props.item._id ,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult()
      // console.log(dropResult)
      if (item && dropResult) {
        console.log(`You dropped ${props.item.name} into ${dropResult.name}!`)
        if(item.type !== 'bun'){
          console.log(props.item)
          dispatch({type: ADD_ITEM_TO_ORDER,
            payload: props.item
          })
        }
        
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
      opacity: monitor.isDragging() ? 0.5 : 1
    })
  }) 
  
  return (
    <>
      <li className="mb-10" onClick={showModalIngredient} ref={ref} style={{opacity}}>
        <Counter count={1} size="default" />
        <img src={props.item.image} alt={props.item.name} ></img>
        <p className="text text_type_digits-default mt-1">
          {props.item.price} <CurrencyIcon type="primary" />
        </p>
        <p className="text text_type_main-default mt-2">{props.item.name}</p>
      </li>
     
    </>
  );
};
BurgerCard.propTypes = {
  item: ingredientTypes,
};
export default BurgerCard;
