import axios from 'axios'
import {
    ALL_TASKS_REQUEST,
    ALL_TASKS_SUCCESS,
    ALL_TASKS_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_FAIL,
    CLEAR_ERRORS,
    LIST_TASK_REQUEST,
    LIST_TASK_SUCCESS,
    LIST_TASK_FAIL,
    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL

} from '../constants/taskConstants'

export const getTasks = () => async (dispatch) => {
    try {
        dispatch({ type: ALL_TASKS_REQUEST })
        const { data } = await axios.get('/api/v1/tasks')
        console.log(data,'fetched tasks')

        dispatch({
            type: ALL_TASKS_SUCCESS,
            payload: data
        })
         console.log(data)
    } catch (error) {
        dispatch({
            type: ALL_TASKS_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete list 
export const deleteTask = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_TASK_REQUEST })

        const { data } = await axios.delete(`/api/v1/task/${id}`)

        dispatch({
            type: DELETE_TASK_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}

// Update TASK 
export const updateTask = (id, taskData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_TASK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/task/${id}`, taskData, config)

        dispatch({
            type: UPDATE_TASK_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}

// create TASK 
export const newTask = (formData) => async (dispatch) => {
    try {

        dispatch({ type: NEW_TASK_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/new/task`, formData, config)

        dispatch({
            type: NEW_TASK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}



// get All tasks of list 
export const getAllTasksOfList = (id) => async (dispatch) => {
    try {
        
        dispatch({ type:  LIST_TASK_REQUEST })

        const { data } = await axios.get(`/api/v1/list/tasks/${id}`)
        dispatch({
            type: LIST_TASK_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type:  LIST_TASK_FAIL,
            payload: error.response.data.message
        })
    }
}

// tasks details
export const getTaskDetails = (id) => async (dispatch) => {
    try {
        
        dispatch({ type:  TASK_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/v1/task/${id}`)
        console.log('task details', data)
        dispatch({
            type: TASK_DETAILS_SUCCESS,
            payload: data.task
        })

    } catch (error) {
        dispatch({
            type:  TASK_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErros = async(dispatch)=>{
dispatch({type:CLEAR_ERRORS })
}
