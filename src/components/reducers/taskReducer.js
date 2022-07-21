import {
    ALL_TASKS_REQUEST,
    ALL_TASKS_SUCCESS,
    ALL_TASKS_FAIL,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    DELETE_TASK_RESET,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    UPDATE_TASK_RESET,
    NEW_TASK_REQUEST,
    NEW_TASK_SUCCESS,
    NEW_TASK_RESET,
    NEW_TASK_FAIL,
    CLEAR_ERRORS,
    LIST_TASK_REQUEST,
    LIST_TASK_SUCCESS,
    LIST_TASK_FAIL,
    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL

} from '../constants/taskConstants'

// all TASKs reducer
export const tasksReducer= ( state = { tasks: [] }, action)=>{
    switch (action.type) {
        case ALL_TASKS_REQUEST:
            return{
                    loading: true,
                    tasks:[]
            }
        case ALL_TASKS_SUCCESS:
            return {
                 loading:false,
                 tasks:action.payload.tasks,
                }
        case ALL_TASKS_FAIL:
            return {
                loading:false,
                error:action.payload
            }
        case CLEAR_ERRORS:{
            return {
                ...state,
                error:null
            }
        }
    default:
        return state 
    }
    
}
// new task reducer
export const newtaskReducer = (state = { task: {} }, action) => {
    switch (action.type) {

        case NEW_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_TASK_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                task: action.payload.task
            }

        case NEW_TASK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_TASK_RESET:
            return {
                ...state,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const taskReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_TASK_REQUEST:
        case UPDATE_TASK_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_TASK_FAIL:
        case UPDATE_TASK_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_TASK_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_TASK_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const listTasksReducer = (state = {tasks: [] }, action) => {
    switch (action.type) {

        case LIST_TASK_REQUEST:
            return {
                loading: true,
                tasks: []
               
            }

        case LIST_TASK_SUCCESS:
            return {
                loading: false,
                tasks: action.payload.tasks
            }

        case LIST_TASK_FAIL:
            return {
                ...state,
                error: action.payload.tasks
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}


export const taskDetailsReducer = (state = {task: {} }, action) => {
    switch (action.type) {

        case TASK_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TASK_DETAILS_SUCCESS:
            return {
                loading: false,
                task: action.payload
            }

        case TASK_DETAILS_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}