import * as TYPES from "../types";

const initialState = {
    user: 'guest',
    users: [],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) { 
        case TYPES.GET_ALL_USER: return{
            ...state,
            users:action.payload   
        }
        case TYPES.GET_USER: return{
            ...state,
            user:action.payload   
        }

        case TYPES.CREATE_USER: return  {...state, user: action.payload} 
        case TYPES.UPDATE_USER: return {...state, users: action.payload}
        case TYPES.DELETE_USER: return state
        case TYPES.CLEAR_USER: return {...state, user: 'guest'}
        
        default:                  return state;
    }
}

export default userReducer;