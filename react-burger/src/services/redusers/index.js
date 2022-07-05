import { combineReducers } from "redux";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  ADD_ITEM_TO_ORDER,
  ADD_BUN_TO_ORDER,
  COUNT_TOTAL_PRICE,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  GET_LOGIN_REQUEST,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_FAILED,
  GET_REGISTER_REQUEST,
  GET_REGISTER_SUCCESS,
  GET_REGISTER_FAILED,
  GET_FORGOT_REQUEST,
  GET_FORGOT_SUCCESS,
  GET_FORGOT_FAILED,
  GET_RESET_REQUEST,
  GET_RESET_SUCCESS,
  GET_RESET_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  GET_SAVE_REQUEST,
  GET_SAVE_SUCCESS,
  GET_SAVE_FAILED,
  DELETE_ITEM_FROM_CONSTRUCTOR,
  REWRITE_INGREDIENTS
} from "../actions";

const initialState = {
  itemsList: [],
  itemsRequest: false,
  itemsFailed: false,

 ingredientsConstructor:{
  buns: null,
  ingredients: [],
 },
  ingredientsId: [],
  ingredientObject: null,
  orderObject: null,

  modalIngredientOpen: false,
  modalOrderOpen: false,
  totalPrice: 0,
  id: null,

  orderNumber: 225322,
  orderRequest: false,
  orderFailed: false,
 
  
};
const authState = {
  loginRequest: false,
  loginFailed: false,
  loginAnswer: '',
  loginSuccess: false,

  registerRequest: false,
  registerFailed: false,
  registerAnswer: '',
  registerSuccess: false,

  forgotRequest: false,
  forgotFailed: false,
  forgotAnswer: null,
  forgotSuccess: false,

  resetRequest: false,
  resetFailed: false,
  resetAnswer: null,
  resetSuccess: false,

  userRequest: false,
  userFailed: false,
  userAnswer: null,
  userSuccess: false,

  userEmail: '',
  userName: '',

  saveRequest: false,
  saveFailed: false,
  saveAnswer: null,
  saveSuccess: false,

}

export const IngredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        itemsList: [...action.itemsList],
        itemsRequest: false
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }

    case ADD_ITEM_TO_ORDER: {
      console.log(action.payload)
      return {
        ...state,
        ingredientsConstructor: {...state.ingredientsConstructor, 
        ingredients: [...state.ingredientsConstructor.ingredients, action.payload],
        },
        ingredientsId: [...state.ingredientsId, action.payload._id],
      };
    }
    case ADD_BUN_TO_ORDER: {
      return { ...state,
        ingredientsConstructor: {...state.ingredientsConstructor, 
          buns: action.payload
          },
          ingredientsId: [...state.ingredientsId, action.payload._id],
         };
    }
    case COUNT_TOTAL_PRICE: {
      console.log(state.ingredients.reduce((acc, item) => acc + item.price, 0))
      return {
        ...state,
        totalPrice:
          state.ingredients.length === 0
            ? 0 + state.buns.price * 2
            : state.ingredients.reduce((acc, item) => acc + item.price, 0) +
              state.buns.price * 2,
      };
    }
    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      };
    }
    case GET_ORDER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        orderFailed: false,
        orderNumber: action.order.order.number,
        orderRequest: false,
      };
    }
    case GET_ORDER_FAILED: {
      return { ...state, orderFailed: true, orderRequest: false };
    }
    case DELETE_ITEM_FROM_CONSTRUCTOR: {
      return {
        ...state,
        ingredientsConstructor: {...state.ingredientsConstructor,
        ingredients: [...state.ingredientsConstructor.ingredients].filter(
          (item) => item.key !== action.payload
        )},
        ingredientsId: [...state.ingredientsId].filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }
    case REWRITE_INGREDIENTS: 
    const copy = [...state.ingredientsConstructor.ingredients]
    copy.splice(action.dragIndex, 1)
    copy.splice(action.hoverIndex, 0, action.dragCard)
      return {
        ...state,
        ingredientsConstructor: {...state.ingredientsConstructor,
        ingredients: copy
      }
      };
     
    default:
      return state;
  }
};



export const AuthReducer = (state = authState, action) => {
  switch (action.type) {
    case GET_LOGIN_REQUEST: {
      return {
        ...state,
        loginRequest: true,
      };
    }
    case GET_LOGIN_SUCCESS: {
      console.log(action);
      return {
        ...state,
        loginFailed: false,
        loginRequest: false,
        loginSuccess: true,

      };
    }
    case GET_LOGIN_FAILED: {
      return { ...state, loginFailed: true, loginRequest: false, loginAnswer: 'неверный пароль или почта' };
    }

    case GET_REGISTER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
      };
    }
    case GET_REGISTER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        registerFailed: false,
        registerRequest: false,
        registerSuccess: true,
      };
    }
    case GET_REGISTER_FAILED: {
      console.log(action)
      return { ...state, registerFailed: true, registerRequest: false,  registerAnswer: 'пользователь уже существует' };
    }
    case GET_FORGOT_REQUEST: {
      return {
        ...state,
        forgotRequest: true,
      };
    }
    case GET_FORGOT_SUCCESS: {
      console.log(action);
      return {
        ...state,
        forgotFailed: false,
        forgotRequest: false,
        forgotSuccess: true,
        forgotAnswer: 'прошло'
      };
    }
    case GET_FORGOT_FAILED: {
      console.log(action)
      return { ...state, forgotFailed: true, forgotRequest: false,  forgotAnswer: 'нет такого имейла' };
    }
    case GET_RESET_REQUEST: {
      return {
        ...state,
        resetRequest: true,
      };
    }
    case GET_RESET_SUCCESS: {
      console.log(action);
      return {
        ...state,
        resetFailed: false,
        resetRequest: false,
        resetSuccess: true,
        resetAnswer: 'прошло'
      };
    }
    case GET_RESET_FAILED: {
      console.log(action)
      return { ...state, resetFailed: true, resetRequest: false,  resetAnswer: 'нет такого имейла' };
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        userRequest: true,
      };
    }
    case GET_USER_SUCCESS: {
      console.log(action);
      return {
        ...state,
        userFailed: false,
        userRequest: false,
        userSuccess: true,
        userAnswer: 'прошло',
        userEmail: action.email,
        userName: action.name
      };
    }
    case GET_USER_FAILED: {
      console.log(action)
      return { ...state, userFailed: true, userRequest: false,  userAnswer: 'чтото не так' };
    }
    case GET_SAVE_REQUEST: {
      return {
        ...state,
        saveRequest: true,
      };
    }
    case GET_SAVE_SUCCESS: {
      console.log(action);
      return {
        ...state,
        saveFailed: false,
        saveRequest: false,
        saveSuccess: true,
        saveAnswer: 'прошло',
        userEmail: action.email,
        userName: action.name
      };
    }
    case GET_SAVE_FAILED: {
      console.log(action)
      return { ...state, saveFailed: true, saveRequest: false,  saveAnswer: 'чтото не так' };
    }
    default:
      return state;
  }
};




export const rootReducer = combineReducers({
  auth: AuthReducer,
  ingredients: IngredientsReducer,
});
