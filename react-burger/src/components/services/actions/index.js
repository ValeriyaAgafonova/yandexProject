import { useSelector } from "react-redux";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';


export const SET_OPEN_INGREDIENT = 'SET_OPEN_INGREDIENT';
export const SET_CLOSE_INGREDIENT = 'SET_CLOSE_INGREDIENT';

export const SET_CLOSE_ORDER = 'SET_CLOSE_ORDER';
export const SET_OPEN_ORDER = 'SET_OPEN_ORDER';


export const ADD_ITEM_TO_ORDER = 'ADD_ITEM_TO_ORDER';
export const DELETE_ITEM_FROM_ORDER = 'DELETE_ITEM_FROM_ORDER';
export const ADD_BUN_TO_ORDER = 'ADD_BUN_TO_ORDER';

export const COUNT_TOTAL_PRICE = 'COUNT_TOTAL_PRICE';
export const COUNT_NUMBER_ITEMS = 'COUNT_NUMBER_ITEMS';


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';


export const DELETE_ITEM_FROM_CONSTRUCTOR = 'DELETE_ITEM_FROM_CONSTRUCTOR';
// export const GET_ITEMS_INGREDIENTS = 'GET_ITEMS_INGREDIENTS';
const url = "https://norma.nomoreparties.space/api/ingredients";

  const checkResponse = (response) => {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка ${response.status}`);
    }
  };

  // const getIngredients = () => {
  //   setState({ ...state, hasError: false, isLoading: true });
  //   fetch(url)
  //     .then(checkResponse)
  //     .then(function (data) {
  //       setState({ ...state, data: data.data, isLoading: false });
  //     })
  //     .catch((e) => {
  //       setState({ ...state, hasError: true, isLoading: false });
  //     });
  // };
const getItemsRequest = () => {
    return fetch(url).then(checkResponse)
  };
  
export function getItems() {
    return function(dispatch) {
      dispatch({
        type: GET_ITEMS_REQUEST
      });
      getItemsRequest().then(res => {
        if (res && res.success) {
          dispatch({
            type: GET_ITEMS_SUCCESS,
            itemsList: res.data,
            
          });
        } else {
          dispatch({
            type: GET_ITEMS_FAILED
          });
        }
      });
    };
  }

const getOrderRequest = (ids) => {
 return fetch(`https://norma.nomoreparties.space/api/orders`,{
    method: "POST",
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
  },
    body:  JSON.stringify({
        ingredients: ids

    }),
})
    .then(checkResponse)
}
export const getOrder = (ids) => {
  return function(dispatch) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(ids).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res,
          
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    });
  };
}
//   export function getIngredients() {
//       return function(dispatch){
//         dispatch({
//             type: GET_ITEMS_INGREDIENTS
//           })
//       } 
//   }