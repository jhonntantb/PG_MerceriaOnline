import axios from 'axios';
import * as TYPES from "../types"


export const getAllCategory = () => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/category')
        return dispatch({ type: TYPES.GET_ALL_CATEGORY, payload: res.data })
    }
}

export const getCategory = (id) => {
    return async (dispatch) => {
        const res = await axios.get('http://localhost:3001/category/' + id)
        return dispatch({ type: TYPES.GET_CATEGORY, payload: res.data })
    }
}


export const postCategory = (name) => {
    return async (dispatch) => {
        const res = await axios.post('http://localhost:3001/category?name=' + name)
        return dispatch({ type: TYPES.CREATE_CATEGORY, payload: res.data })
    }
}




export function deleteCategory(id) {
    return async function (dispatch) {
        try {
            await axios.delete("http://localhost:3001/category/"+ id);
            return dispatch({type:TYPES.DELETE_CATEGORY})
        } catch (error) {
            console.log(error)
        }
    }
}

export const updateCategory = (id) => {

    return async (dispatch) => {
        const res = await axios.put('http://localhost:3001/category/'+ id)
        return dispatch({ type: TYPES.UPDATE_CATEGORY, payload: res.data })
    }
}
export function SetCategoriesFiltradas(response){
    return(dispatch) => {

            dispatch({
                type:TYPES.SET_CATEGORY_FILTRADA,
                payload:response
            });

        } 
    }

