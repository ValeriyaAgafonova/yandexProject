import React from 'react';
import Styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {

    return(
        <div className={Styles.right}></div>
    )

}

export default React.memo(BurgerConstructor);