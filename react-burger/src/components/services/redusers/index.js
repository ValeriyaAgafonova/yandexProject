import { combineReducers } from "redux";
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  SET_OPEN_INGREDIENT,
  SET_CLOSE_INGREDIENT,
  SET_CLOSE_ORDER,
  SET_OPEN_ORDER,
  ADD_ITEM_TO_ORDER,
  ADD_BUN_TO_ORDER,
  COUNT_TOTAL_PRICE,
  COUNT_NUMBER_ITEMS,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  DELETE_ITEM_FROM_CONSTRUCTOR,
} from "../actions";

const initialState = {
  itemsList: [],
  itemsRequest: false,
  itemsFailed: false,

  // ingredientsConstructor:
  buns: null,
  ingredients: [],
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
        itemsList: action.itemsList,
        itemsRequest: false,
      };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case SET_OPEN_INGREDIENT: {
      return {
        ...state,
        modalIngredientOpen: true,
        ingredientObject: action.payload,
      };
    }
    case SET_CLOSE_INGREDIENT: {
      return { ...state, modalIngredientOpen: false, ingredientObject: null };
    }
    case SET_OPEN_ORDER: {
      return { ...state, modalOrderOpen: true };
    }
    case SET_CLOSE_ORDER: {
      return { ...state, modalOrderOpen: false };
    }
    case ADD_ITEM_TO_ORDER: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
        ingredientsId: [...state.ingredientsId, action.payload._id],
      };
    }
    case ADD_BUN_TO_ORDER: {
      return { ...state, buns: action.payload };
    }
    case COUNT_TOTAL_PRICE: {
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
        ingredients: [...state.ingredients].filter(
          (item) => item.key !== action.payload
        ),
        ingredientsId: [...state.ingredientsId].filter(
          (item) => item._id !== action.payload._id
        ),
      };
    }

    default:
      return state;
  }
};
export const ConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  constructor: ConstructorReducer,
  ingredients: IngredientsReducer,
});
