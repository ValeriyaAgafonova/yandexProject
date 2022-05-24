import React from 'react';
import Styles from './BurgerConstructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const BurgerConstructor = (props) => {
let items = []
for (let item in props){
  items.push(props[item])
}
console.log(items)
    return(
        <div className={Styles.right}>
             <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <ConstructorElement
        type="top"
        isLocked={true}
        text="Краторная булка N-200i (верх)"
        price={200}
        thumbnail={props[0].image}
      />
      <div className={`${Styles.ingredients} custom-scroll`}>
         { items.map((item, index) =>(item.type !== 'bun' &&
         <ConstructorElement key= {item._id}
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
        thumbnail={props[0].image}
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
BurgerConstructor.propTypes = {
  calories: PropTypes.number,
carbohydrates: PropTypes.number,
fat: PropTypes.number,
image: PropTypes.string,
image_large: PropTypes.string,
image_mobile: PropTypes.string,
name: PropTypes.string,
price: PropTypes.number,
proteins: PropTypes.number,
type: PropTypes.string,
__v: PropTypes.number,
_id: PropTypes.string,
}
export default React.memo(BurgerConstructor);