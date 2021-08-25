import * as TYPES from "../types";

const initialState = {
    schedules:[],
    schedule:[],
  };

const scheduleReducer = (state = initialState, action) => {
    switch (action.type) { 
        case TYPES.GET_ALL_SCHEDULE: return{
            ...state,
            schedules:action.payload
        }
        case TYPES.GET_SCHEDULE: return{
            ...state,
            schedule:action.payload
        }
        case TYPES.CREATE_STOCK: return state
        case TYPES.UPDATE_STOCK: return state
        case TYPES.DELETE_STOCK: return state
        default:                  return state;
    }
}

export default scheduleReducer; 