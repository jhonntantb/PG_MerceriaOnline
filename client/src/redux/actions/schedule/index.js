import axios from 'axios';
import * as TYPES from "../types"


export const getAllSchedule = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/schedule')
        return dispatch({ type: TYPES.GET_ALL_SCHEDULE, payload: res.data })
    }
}

export const getSchedule = (id) => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/schedule/' + id)
        return dispatch({ type: TYPES.GET_SCHEDULE, payload: res.data })
    }
}

export const postSchedule = (schedule) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:3001/schedule', schedule)
        return dispatch({ type: TYPES.CREATE_SCHEDULE, payload: res.data })
    }
}

export const deleteSchedule = (params) => {
    return async (dispatch) => {
        const res = await axios.delete('http://localhost:3001/schedule', params)
        return dispatch({ type: TYPES.DELETE_SCHEDULE, payload: res.data })
    }
}

export const updateSchedule = (changes) => {
    return async (dispatch) => {
        const res = await axios.put('http://localhost:3001/schedule', changes)
        return dispatch({ type: TYPES.UPDATE_SCHEDULE, payload: res.data })
    }
}
