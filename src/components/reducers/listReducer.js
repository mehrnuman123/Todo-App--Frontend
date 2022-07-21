import {
    ALL_LISTS_REQUEST,
    ALL_LISTS_SUCCESS,
    ALL_LISTS_FAIL,
    CLEAR_ERRORS,
    NEW_LIST_REQUEST,
    NEW_LIST_SUCCESS, 
    NEW_LIST_RESET, 
    NEW_LIST_FAIL,
    DELETE_LIST_REQUEST,
    DELETE_LIST_RESET,
    DELETE_LIST_SUCCESS,
    DELETE_LIST_FAIL,
    UPDATE_LIST_REQUEST,
    UPDATE_LIST_RESET,
    UPDATE_LIST_SUCCESS,
    UPDATE_LIST_FAIL,
    LIST_DETAILS_REQUEST,
    LIST_DETAILS_SUCCESS,
    LIST_DETAILS_FAIL

    
} from'../constants/listConstants'


// all LISTs reducer
export const listsReducer= ( state = { lists: [] }, action)=>{
    switch (action.type) {
        case ALL_LISTS_REQUEST:
            return{
                    loading: true,
                    lists:[]
            }
        case ALL_LISTS_SUCCESS:
            return {
                 loading:false,
                 lists:action.payload.lists,
                }
        case ALL_LISTS_FAIL:
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
// new list reducer
export const newListReducer = (state = { list: {} }, action) => {
    switch (action.type) {

        case NEW_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_LIST_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                list: action.payload.list
            }

        case NEW_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case NEW_LIST_RESET:
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


export const listReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_LIST_REQUEST:
        case UPDATE_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }


        case DELETE_LIST_FAIL:
        case UPDATE_LIST_FAIL:
            return {
                ...state,
                error: action.payload
            }

        case DELETE_LIST_RESET:
            return {
                ...state,
                isDeleted: false
            }

        case UPDATE_LIST_RESET:
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

export const listDetailsReducer = (state = {list: {} }, action) => {
    switch (action.type) {

        case LIST_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case LIST_DETAILS_SUCCESS:
            return {
                loading: false,
                list: action.payload
            }

        case LIST_DETAILS_FAIL:
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