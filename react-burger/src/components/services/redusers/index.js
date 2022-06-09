import { combineReducers } from "redux";
import {GET_ITEMS_REQUEST, GET_ITEMS_SUCCESS, GET_ITEMS_FAILED, SET_OPEN_INGREDIENT, SET_CLOSE_INGREDIENT, SET_CLOSE_ORDER, SET_OPEN_ORDER, SWITCH_MENU, DELETE_ITEM_FROM_ORDER, ADD_ITEM_TO_ORDER} from '../actions'



const initialState = {
    itemsList: [],
    itemsRequest: false,
    itemsFailed: false,

    // ingredientsConstructor:
      buns: null,
      ingredients: [],
   
    ingredientObject: null,
    orderObject: null,
    
    modalIngredientOpen: false,
    modalOrderOpen: false,

    activeMenu: 'buns',
    

    totalPrice: 0
    

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
      return { ...state,  modalIngredientOpen: true, ingredientObject: action.payload};
    }
    case SET_CLOSE_INGREDIENT: {
      return { ...state,  modalIngredientOpen: false, ingredientObject: null};
    }
    case SET_OPEN_ORDER: {
      return { ...state,  modalOrderOpen: true};
    }
    case SET_CLOSE_ORDER: {
      return { ...state,  modalOrderOpen: false};
    }
    case SWITCH_MENU:{
      console.log(action.payload)
      return {...state, activeMenu: action.payload}
    }
    case ADD_ITEM_TO_ORDER:{
      console.log(action.payload)
      return {...state, 
        ingredients: [...state.ingredients, ...state.ingredients.push(action.payload)]
        // ingredients:[...state.ingredients].push(action.payload),
      }
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