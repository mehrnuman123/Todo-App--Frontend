import axios from 'axios'
import {
    ALL_LISTS_REQUEST,
    ALL_LISTS_SUCCESS,
    ALL_LISTS_FAIL,
    DELETE_LIST_REQUEST,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAIL,
    UPDATE_LIST_REQUEST,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAIL,
    NEW_LIST_REQUEST,
    NEW_LIST_SUCCESS,
    NEW_LIST_FAIL,
    CLEAR_ERRORS,
    LIST_DETAILS_REQUEST,
    LIST_DETAILS_SUCCESS,
    LIST_DETAILS_FAIL

} from '../constants/listConstants'

export const getLists = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_LISTS_REQUEST })
        const { data } = await axios.get('/api/v1/lists')
        dispatch({
            type: ALL_LISTS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_LISTS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete list 
export const deleteList = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_LIST_REQUEST })

        const { data } = await axios.delete(`/api/v1/list/${id}`)

        dispatch({
            type: DELETE_LIST_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update LIST 
export const updateList = (id, listData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_LIST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/list/${id}`, listData, config)

        dispatch({
            type: UPDATE_LIST_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

// create LIST 
export const newList = (formData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_LIST_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/new/list`, formData, config)

        dispatch({
            type: NEW_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_LIST_FAIL,
            payload: error.response.data.message
        })
    }
}

// LIST details
export const getListDetails = (id) => async (dispatch) => {
    try {
        
        dispatch({ type:  LIST_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/list/${id}`)
        dispatch({
            type: LIST_DETAILS_SUCCESS,
            payload: data.list
        })

    } catch (error) {
        dispatch({
            type:  LIST_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErros = async(dispatch)=>{
dispatch({type:CLEAR_ERRORS })
}
