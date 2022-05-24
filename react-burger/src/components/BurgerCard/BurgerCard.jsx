import React from 'react';
import styles from './BurgerCard.module.css'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';
const BurgerCard = ({item}) => {
    return(
       <li className='mb-10'>
         <Counter count={1} size="default" />
        <img src={item.image} alt='d'></img>
        <p className='text text_type_digits-default mt-1'>{item.price}  <CurrencyIcon type="primary" /></p>
        <p className="text text_type_main-default mt-2">{item.name}</p>
      </li>
    )
}

export default BurgerCard