import axios from 'axios';
import * as TYPES from "../types"


export const createProduct = (product) => {
    return  async (dispatch) => {
        const res = await axios.post('http://localhost:3001/product', product)
        return dispatch({ type: TYPES.CREATE_PRODUCT, payload: res.data })
    }
}

export const getProduct = (id) => {
    return async  (dispatch) => {
        const res = await axios.get('http://localhost:3001/product/' + id)
        console.log(res)
        return dispatch({ type: TYPES.GET_PRODUCT, payload: res.data })
    }
}

export const getAllProduct = (search='', order='') => {
        return async  (dispatch) => {
        const res = await axios.get(`http://localhost:3001/product?name=${search}&order=${order}`)
        console.log('Action getAllProduct valor res:', res)
        return dispatch({ type: TYPES.GET_ALL_PRODUCT, payload: res.data })
    }
}

export const getSomeProduct = (arr=[]) => {
    console.log('get some product aqui estoy');
    return { type: TYPES.GET_SOME_PRODUCT, payload: arr }
}



export const updateProduct = (params) => {
    return async  (dispatch) => {
        const res = await axios.put('http://localhost:3001/product/', params)
        return dispatch({ type: TYPES.UPDATE_PRODUCT, payload: res.data })
    }
}


export const deleteProduct = (params) => {
    return async  (dispatch) => {
        const res = await axios.delete('http://localhost:3001/product', params)
        return dispatch({ type: TYPES.DELETE_PRODUCT, payload: res.data })
    }
}
export const getProductCategory = (categoryId) => {
    return   (dispatch) => {
        return dispatch({ type: TYPES.PRODUCT_CATEGORY, payload: categoryId })
    }
}

export const resetProduct = () => {
    return {
    type: TYPES.RESET_PRODUCT
    }
  };

  export const resetProducts = () => {
    return {
    type: TYPES.RESET_PRODUCTS
    }
  };  

