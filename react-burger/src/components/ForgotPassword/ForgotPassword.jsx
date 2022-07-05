import styles from './ForgotPassword.module.css';
import { useState, useRef } from 'react';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { getForgot } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
const ForgotPassword = () =>{
const dispatch = useDispatch()
const {forgotAnswer, forgotSuccess } = useSelector(state => state.auth)
    const [email, setEmail] = useState('')
    const changeEmail = e => {
      setEmail(e.target.value)
    }

    const inputRef = useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }
const forgot = (e) =>{
e.preventDefault()
getForgot(email, dispatch)
}

if (forgotSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/reset-password'
        }}
      />
    );
  }
    return(
        <div className={styles.forgetContainer}>
<h2>Забыли пароль</h2>
<form className={styles.formContainer} onSubmit={forgot}>
<Input
      type={'email'}
      placeholder={'email'}
      onChange={changeEmail}
      value={email}
      name={'name'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
      width={'100%'}
    />

<Button type="primary" size="medium">
  Восстановить
</Button>
</form>
<p>{forgotAnswer}</p>
<p>Вспомнили пароль? <Link to='./login'>Войти</Link></p>

        </div>
    )


}

export default ForgotPassword