import React from 'react';
import Styles from './BurgerConstructor.module.css';
import data from '../../utils/data';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';


const BurgerConstructor = () => {

    return(
        <div className={Styles.right}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={data[0].image}
      />
      <div className={`${Styles.ingredients} custom-scroll`}>
         { data.map((item,index) =>(item.type !== 'bun' &&
         <ConstructorElement
        text={item.name}
        price={item.price}
        thumbnail={item.image}
      />
         ))}
      
      </div>
      <ConstructorElement
        type="bottom"
        isLocked={true}
        text="Краторная булка N-200i (низ)"
        price={200}
        thumbnail={data[0].image}
      />
    </div>
    <div className={Styles.amount}>
        <p className="text text_type_digits-medium">12342 <CurrencyIcon type="primary"/></p>
        <Button type="primary" size="medium">
  Оформить заказ
</Button>
    </div>
        </div>
    )

}

export default React.memo(BurgerConstructor);