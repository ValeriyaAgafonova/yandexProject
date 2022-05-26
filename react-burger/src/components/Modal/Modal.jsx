import React from 'react';
import Styles from './Modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../OrderDetails/OrderDetails';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import ReactDOM from 'react-dom';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import PropTypes from 'prop-types';

const container = document.getElementById('root')

const Modal = (props) => {

  const closeModal = () => {
      document.getElementById('modalOverlay').remove()
      document.getElementById('modal').remove()
  }

  React.useEffect(() => {
    const onKeypress = e => {
        if (e.keyCode === 27 && document.getElementById('modalOverlay') !== null){
            closeModal()
        }
    };
    document.addEventListener('keydown', onKeypress);
    return () => {
      document.removeEventListener('keydown', onKeypress);
    };
  }, []);

return(
    ReactDOM.createPortal(
        <div>
       <ModalOverlay />
            <div className={Styles.modal} id='modal' >
      <div className={Styles.close}>
      <CloseIcon type="primary" onClick={closeModal}/>
      </div>
      {props.content === 'ingredient' && 
      <IngredientDetails {...props.data}/>
      }
      {props.content === 'order' && 
      <OrderDetails />
      }
     
        </div>
        </div>
          , container

)
)
    }

    Modal.propTypes = {
        content: PropTypes.string,
    }



export default Modal