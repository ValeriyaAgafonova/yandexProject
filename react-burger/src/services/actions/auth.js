import { url } from "./index";
import { checkResponse } from "./index";
import { setCookie, getCookie } from "../../utils/cookie";

export const GET_LOGIN_REQUEST = "GET_LOGIN_REQUEST";
export const GET_LOGIN_SUCCESS = "GET_LOGIN_SUCCESS";
export const GET_LOGIN_FAILED = "GET_LOGIN_FAILED";

export const GET_REGISTER_REQUEST = "GET_REGISTER_REQUEST";
export const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
export const GET_REGISTER_FAILED = "GET_REGISTER_FAILED";

export const GET_FORGOT_REQUEST = "GET_FORGOT_REQUEST";
export const GET_FORGOT_SUCCESS = "GET_FORGOT_SUCCESS";
export const GET_FORGOT_FAILED = "GET_FORGOT_FAILED";

export const GET_RESET_REQUEST = "GET_RESET_REQUEST";
export const GET_RESET_SUCCESS = "GET_RESET_SUCCESS";
export const GET_RESET_FAILED = "GET_RESET_FAILED";

export const GET_USER_REQUEST = "GET_USER_REQUEST";
export const GET_USER_SUCCESS = "GET_USER_SUCCESS";
export const GET_USER_FAILED = "GET_USER_FAILED";

export const GET_SAVE_REQUEST = "GET_SAVE_REQUEST";
export const GET_SAVE_SUCCESS = "GET_SAVE_SUCCESS";
export const GET_SAVE_FAILED = "GET_SAVE_FAILED";

export const CHECK_COMPLETE = "CHECK_COMPLETE";

export const checkAuth = (dispatch) => {
if(getCookie('accessToken')){
   userRequest(dispatch)
 dispatch({type: CHECK_COMPLETE})
}
else{
    dispatch({type: CHECK_COMPLETE})
}
}



// получение данных о пользователе
const userRequest = async () => {
    return await fetch(`${url}auth/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
      },
      // body: JSON.stringify({ token: localStorage.getItem('refreshToken')}),
    }).then(checkResponse);
  };
  
  export const getUser = (dispatch) => {
    dispatch({
      type: GET_USER_REQUEST,
    });
    userRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_USER_SUCCESS,
            email: res.user.email,
            name: res.user.name
          });
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_USER_FAILED,
        });
      });
  };
  
  // авторизация
  const loginRequest = async (form) => {
    return await fetch(`${url}auth/login`, {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
       
      },
      body: JSON.stringify({ email: form.email, password: form.password }),
    }).then(checkResponse);
  };
  
  export const getLogin = (form, dispatch) => {
    console.log("tologin");
  
    console.log("indispatch");
    dispatch({
      type: GET_LOGIN_REQUEST,
    });
    loginRequest(form)
      .then((res) => {
        if (res && res.success) {
          setCookie("accessToken", res.accessToken);
          localStorage.setItem("refreshToken", res.refreshToken);
          dispatch({
            type: GET_LOGIN_SUCCESS,
            answer: res.user,
          });
          getUser(dispatch)
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_LOGIN_FAILED,
        });
      });
  };
  
  //регистрация
  const getRegisterRequest = (form) => {
    return fetch(`${url}auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({
        name: form.name,
        password: form.password,
        email: form.email,
      }),
    }).then(checkResponse);
  };
  
  export const getRegister = (form, dispatch) => {
    console.log("get");
  
    console.log("dis");
    dispatch({
      type: GET_REGISTER_REQUEST,
    });
    getRegisterRequest(form)
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: GET_REGISTER_SUCCESS,
          });
        } else {
          console.log("else", res);
          dispatch({
            type: GET_REGISTER_FAILED,
            answer: res.message,
          });
        }
      })
      .catch((err) => {
        console.log("catch", err);
        dispatch({
          type: GET_REGISTER_FAILED,
          answer: err.message,
        });
      });
  };
  
  //отправка кода на почту
  const getForgotRequest = (form) => {
    console.log(form);
    return fetch(`${url}password-reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        email: form,
      }),
    }).then(checkResponse);
  };
  
  export const getForgot = (form, dispatch) => {
    dispatch({
      type: GET_FORGOT_REQUEST,
    });
    getForgotRequest(form)
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: GET_FORGOT_SUCCESS,
          });
        } else {
          console.log("else", res);
          dispatch({
            type: GET_FORGOT_FAILED,
            answer: res.message,
          });
        }
      })
      .catch((err) => {
        console.log("catch", err);
        dispatch({
          type: GET_FORGOT_FAILED,
          answer: err.message,
        });
      });
  };
  //обновление пароля
  const getResetRequest = (form) => {
    return fetch(`${url}password-reset/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        password: form.password,
        token: form.code,
      }),
    }).then(checkResponse);
  };
  export const getReset = (form, dispatch) => {
    dispatch({
      type: GET_RESET_REQUEST,
    });
    getResetRequest(form)
      .then((res) => {
        console.log(res);
        if (res && res.success) {
          dispatch({
            type: GET_RESET_SUCCESS,
          });
        } else {
          console.log("else", res);
          dispatch({
            type: GET_RESET_FAILED,
            answer: res.message,
          });
        }
      })
      .catch((err) => {
        console.log("catch", err);
        dispatch({
          type: GET_RESET_FAILED,
          answer: err.message,
        });
      });
  };
  //сохранение изменений
  
  const saveRequest = async (form) => {
    return await fetch(`${url}auth/user`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: getCookie("accessToken"),
      },
      body: JSON.stringify({ name: form.name, email: form.email}),
    }).then(checkResponse);
  };
  
  export const getSaveChanges = (form, dispatch) => {
    dispatch({
      type: GET_SAVE_REQUEST,
    });
    saveRequest(form)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_SAVE_SUCCESS,
            email: res.user.email,
            name: res.user.name
          });
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_SAVE_FAILED,
        });
      });
  };