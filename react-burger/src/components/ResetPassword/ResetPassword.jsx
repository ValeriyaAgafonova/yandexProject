import styles from './ResetPassword.module.css';
import { useState, useRef } from 'react';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { getReset } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const ResetPassword = () =>{
    // const [code, setCode] = useState('code')
    const resetSuccess = useSelector(state => state.auth.resetSuccess)
    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }
   
    // const [password, setPassword] = useState('Пароль')
    // const сhangePassword = e => {
    //   setPassword(e.target.value)
    // }

    const [form, setValue] = useState({ code: '', password: '' });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };


const reset = (e) => {
    e.preventDefault()
    getReset(form, dispatch)
}
if (resetSuccess) {
    return (
      <Redirect
        to={{
          pathname: '/login'
        }}
      />
    );
  }
    return(
        <div className={styles.resetContainer}>
<h2>Восстановить пароль</h2>
<form onSubmit={reset}>
<PasswordInput onChange={onChange} value={form.password} name={'password'} className={styles.email}/>
<Input
      type={'text'}
      placeholder={'введите код'}
      onChange={onChange}
      icon={'CurrencyIcon'}
      value={form.code}
      name={'code'}
      error={false}
      ref={inputRef}
      onIconClick={onIconClick}
      errorText={'Ошибка'}
      size={'default'}
    />

<Button type="primary" size="medium">
  Сохранить
</Button>
</form>
<p>Вспомнили пароль? <Link to='/login'>Войти</Link></p>

        </div>
    )


}

export default ResetPassword