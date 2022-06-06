import { combineReducers } from "redux";
import {GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, SET_OPEN_INGREDIENT, SET_CLOSE_INGREDIENT} from '../actions'
import { store } from "../store";


const initialState = {
    itemsList: [],
    itemsRequest: false,
    itemsFailed: false,

    ingredientsConstructor: [],
    ingredientObject: null,
    orderObject: null,
    
    modalIngredientOpen: false

}
export const IngredientsReducer = (state = initialState, action) => {
    switch (action.type){
case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return { ...state, itemsFailed: false, itemsList: action.itemsList, itemsRequest: false };
    }
    case GET_ITEMS_FAILED: {
      return { ...state, itemsFailed: true, itemsRequest: false };
    }
    case SET_OPEN_INGREDIENT: {
      return { ...state,  modalIngredientOpen: true, ingredientObject: [...state.itemsList].filter(item => item._id === action.id)};
    }
    case SET_CLOSE_INGREDIENT: {
      return { ...state,  modalIngredientOpen: false, ingredientObject: null};
    }
        default:
            return state;
        
    }
}
export const ConstructorReducer = (state = initialState, action) => {
    switch (action.type){

        default:
            return state;
        
    }
}






export const rootReducer = combineReducers({
   constructor: ConstructorReducer,
   ingredients: IngredientsReducer
  });