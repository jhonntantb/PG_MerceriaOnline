import axios from "axios"
import * as TYPES from "../types"

export const getCart = (userId) => {
    return async (dispatch) => {
        let cart = {order: null, cartProducts: []}
        
        if (userId) {
            let res = await axios.get("http://localhost:3001/order?status=cart&userId=" + userId)
            // console.log("esto es res.data en el reducer " , res.data)
            cart = res.data.length>0 ? {order: res.data[0], cartProducts: res.data[0].products} : {order: null, cartProducts : []}
            // console.log(cart)
        }
        // else
        //     cart.cartProducts = JSON.parse(localStorage.getItem("cart")) || []
        
        return dispatch({ type: TYPES.GET_CART, payload: cart})
    }
}

export const setLoading = (loading) => {
    return async (dispatch) => {
        return dispatch({ type: TYPES.SET_LOADING, payload: loading})
    }
}

export const addPrice = (newPrice) => {
    return async (dispatch) => {
        return dispatch({ type: TYPES.ADD_PRICE, payload: newPrice})
    }
}

export const removePrice = (productId) => {
    return async (dispatch) => {
        return dispatch({ type: TYPES.REMOVE_PRICE, payload: productId})
    }
}