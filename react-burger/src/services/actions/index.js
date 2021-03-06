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


export const url = "https://norma.nomoreparties.space/api/";

//проверка респонса
export const checkResponse = (response) => {
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
