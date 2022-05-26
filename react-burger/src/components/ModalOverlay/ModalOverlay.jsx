import React from 'react';
import Styles from './ModalOverlay.module.css';


const ModalOverlay = () => {   

    const closeModal = () => {
        document.getElementById('modalOverlay').remove()
      document.getElementById('modal').remove()
    }

return( 
<div className={Styles.overlay} id="modalOverlay" onClick={closeModal}>
    </div>
    )
}

export default ModalOverlay