import axios from 'axios';
import * as TYPES from "../types"

export const createUser = (user) => {
    return async  (dispatch) => {
        const res = await axios.post('http://localhost:3001/user', user)
        return dispatch({ type: TYPES.CREATE_USER, payload: res.data })
    }
}

export const updateUser = (params) => {
    return async  (dispatch) => {
        
        const res = await axios.put('http://localhost:3001/user', params)
        return dispatch({ type: TYPES.UPDATE_USER, payload: res.data })
    }
}

export const getUser = (id) => {
    return async  (dispatch) => {
        const res = await axios.get('http://localhost:3001/user/' + id)
        return dispatch({ type: TYPES.GET_USER, payload: res.data })
    }
}

export const getAllUser = () => {
    return async  (dispatch) => {
        const res = await axios.get('http://localhost:3001/user')
        return dispatch({ type: TYPES.GET_ALL_USER, payload: res.data })
    }
}

export const deleteUser = (params) => {
    return async  (dispatch) => {
        const res = await axios.delete('http://localhost:3001/user', params)
        return dispatch({ type: TYPES.DELETE_USER, payload: res.data })
    }
}

export const clearUser = () => {
    return (dispatch) => {
        return dispatch({type: TYPES.CLEAR_USER})
    }
}

export const getGoogleUser = (user) => {
    return async (dispatch) => {
        try { const res = await axios.get('http://localhost:3001/user/' + user.id)
        console.log("googlereducer - respuesta del back: " ,res.data)
        if(res.data.email!==undefined) return dispatch({type: TYPES.GET_USER, payload: res.data})
        } catch(err) {
            console.log("No encontro el usuario en la DB")
            const userNew = await axios.post('http://localhost:3001/user', user)
            console.log("y esta es la respuesta del back al intentar crear usuario: " , userNew.data)
            return dispatch({ type: TYPES.CREATE_USER, payload: userNew.data })
        }
    }    
    
}

