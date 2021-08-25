import * as TYPES from "../types";

const initialState = {
    orders:[],
    order:[],
  };

const orderReducer = (state = initialState, action) => {
    switch (action.type) { 
        case TYPES.GET_ALL_ORDER: return{
            ...state,
            orders:action.payload
        }
        case TYPES.GET_ALL_ORDER_USER: return{
            ...state,
            orders:action.payload
        }
        case TYPES.GET_ORDER: return{
            ...state,
            order:action.payload
        }
        case TYPES.CREATE_ORDER: return {
            ...state,
            order: action.payload
        }
        case TYPES.UPDATE_ORDER: return {...state, order: action.payload}
        case TYPES.DELETE_ORDER: return state

        case TYPES.GET_ORDER_FROM_USER: return {...state, order:action.payload}
        case TYPES.CLEAR_ORDER: return {...state, order:[]}
        default:                  return state;
    }
}

export default orderReducer; 