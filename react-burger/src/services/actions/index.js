import { useDispatch, useSelector } from "react-redux";
import { setCookie, getCookie } from "../../utils/cookie";

export const GET_ITEMS_REQUEST = "GET_ITEMS_REQUEST";
export const GET_ITEMS_SUCCESS = "GET_ITEMS_SUCCESS";
export const GET_ITEMS_FAILED = "GET_ITEMS_FAILED";

export const ADD_ITEM_TO_ORDER = "ADD_ITEM_TO_ORDER";
export const DELETE_ITEM_FROM_ORDER = "DELETE_ITEM_FROM_ORDER";
export const ADD_BUN_TO_ORDER = "ADD_BUN_TO_ORDER";

export const COUNT_TOTAL_PRICE = "COUNT_TOTAL_PRICE";
export const COUNT_NUMBER_ITEMS = "COUNT_NUMBER_ITEMS";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export const REWRITE_INGREDIENTS = "REWRITE_INGREDIENTS";

export const PLUS_INGREDIENT_COUNTER = "PLUS_INGREDIENT_COUNTER";
export const DELETE_ITEM_FROM_CONSTRUCTOR = "DELETE_ITEM_FROM_CONSTRUCTOR";

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
const url = "https://norma.nomoreparties.space/api/";

//проверка респонса
const checkResponse = (response) => {
  console.log(response);
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject(`Ошибка ${response.status}`);
  }
};

//получение списка ингредиентов
const getItemsRequest = () => {
  return fetch(`${url}ingredients`).then(checkResponse);
};

export function getItems() {
  return function (dispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST,
    });
    getItemsRequest()
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            itemsList: res.data,
          });
        } else {
          throw new Error(res);
        }
      })
      .catch((err) => {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      });
  };
}
//получение номера заказа
const getOrderRequest = (ids) => {
  return fetch(`${url}orders`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ingredients: ids,
    }),
  }).then(checkResponse);
};

export const getOrder = (ids) => {
  return function (dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST,
    });
    getOrderRequest(ids)
      .then((res) => {
        if (res && res.success) {
          dispatch({
            type: GET_ORDER_SUCCESS,
            order: res,
          });
        } else {
          throw new Error(res);
        }
      })
      .catch((e) => {
        dispatch({
          type: GET_ORDER_FAILED,
        });
      });
  };
};

// получение данных о пользователе
const userRequest = async () => {
  return await fetch(`https://norma.nomoreparties.space/api/auth/user`, {
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
  return await fetch("https://norma.nomoreparties.space/api/auth/login", {
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
  return fetch("https://norma.nomoreparties.space/api/auth/register", {
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
  return fetch("https://norma.nomoreparties.space/api/password-reset", {
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
  return fetch("https://norma.nomoreparties.space/api/password-reset/reset", {
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
  return await fetch(`https://norma.nomoreparties.space/api/auth/user`, {
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