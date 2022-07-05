import styles from './Register.module.css';
import { useState, useRef } from 'react';
import { PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import { getRegister } from '../../services/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Register = () =>{
    const userName = useSelector(state => state.auth.userName);
  
   const { registerAnswer, registerSuccess } = useSelector(state => state.auth)
    const inputRef = useRef(null)
    const onIconClick = () => {
      setTimeout(() => inputRef.current.focus(), 0)
      alert('Icon Click Callback')
    }

    
    const [form, setValue] = useState({ email: '', password: '', name: '' });
    const onChange = e => {
        setValue({ ...form, [e.target.name]: e.target.value });
      };
const dispatch = useDispatch();
    function register(e){
        e.preventDefault()
        getRegister(form, dispatch)
        }
        if (registerSuccess) {
            return (
              <Redirect
                to={{
                  pathname: '/login'
                }}
              />
            );
          }


          if(userName){
              return (
                <Redirect
                to={{
                  pathname: '/'
                }}
              />
              )
            }
return (
    <div className={styles.registerContainer}>
        <form className={styles.formContainer} onSubmit={register}>
        <h2>Регистрация</h2>
        <Input
        type={'text'}
        placeholder={'Имя'}
        onChange={onChange}
        value={form.name}
        name={'name'}
        error={false}
        ref={inputRef}
        onIconClick={onIconClick}
        errorText={'Ошибка'}
        size={'default'} />
        
        <Input
            type={'email'}
            placeholder={'email'}
            onChange={onChange}
            value={form.email}
            name={'email'}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={'Ошибка'}
            size={'default'} />
            <PasswordInput onChange={onChange} value={form.password} name={'password'} className={styles.email}/>
            <Button type="primary" size="medium">
  Зарегистрироваться
</Button>
</form>
<p>{registerAnswer}</p>
<p>Уже зарегистрировались <Link to='/login'>Войти</Link></p>
            
            </div>
)

}

export default Register