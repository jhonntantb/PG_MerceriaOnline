import * as TYPES from "../types";

const initialState = {
    cart: {order: null, cartProducts: []},
    loading: false,
    prices: [],
  };

const cartReducer = (state = initialState, action) => {
    switch (action.type) { 
        case TYPES.GET_CART: return{
            ...state,
            cart: action.payload
        }
        case TYPES.ADD_PRICE: return {
            ...state,
            prices: (state.prices.find(price => price.id == action.payload.id)) ?
                    state.prices.map(price =>
                        price.id == action.payload.id ? action.payload : price
                    )
                :
                    [...state.prices, action.payload]
        }
        case TYPES.REMOVE_PRICE: return {
            ...state,
            prices: state.prices.filter(p => p.id != action.payload)
        }
        case TYPES.SET_LOADING: return {
            ...state,
            loading: action.payload
        }
        case TYPES.CLEAR_CART: return initialState
        default:                  return state;
    }
}

export default cartReducer;