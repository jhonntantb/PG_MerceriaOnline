import axios from 'axios';
import * as TYPES from "../types"

export const createOrder = (order) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:3001/order', order)
        return dispatch({ type: TYPES.CREATE_ORDER, payload: res.data })
    }
}

export const updateOrder = (params) => {
    return async (dispatch) => {
        const res = await axios.put('http://localhost:3001/order', params)
        return dispatch({ type: TYPES.UPDATE_ORDER, payload: res.data })
    }
}

export const updateOrderStatus = (orderId, Status) => {
    return async (dispatch) => {
        const res = await axios.put(`http://localhost:3001/order/${orderId}/${Status}`)
        return dispatch({ type: TYPES.UPDATE_ORDER_STATUS, payload: res.data })
    }
}

export const getOrder = (id) => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/order/' + id)
        return dispatch({ type: TYPES.GET_ORDER, payload: res.data })
    }
}

export const getAllOrder = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/order')
        return dispatch({ type: TYPES.GET_ALL_ORDER, payload: res.data })
    }
}

export const getOrdersFromUser = (userId, status) => {
    return async (dispatch) => {
        const res = await axios.get(`http://localhost:3001/order?userId=${userId}&status=${status}`)
        return dispatch({ type: TYPES.GET_ORDER_FROM_USER, payload: res.data })
    }
}

export const deleteOrder = (params) => {
    return async (dispatch) => {
        const res = await axios.delete('http://localhost:3001/order', params)
        return dispatch({ type: TYPES.DELETE_ORDER, payload: res.data })
    }
}