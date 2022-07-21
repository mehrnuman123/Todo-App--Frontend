import { createStore , combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {listsReducer, listReducer, newListReducer,listDetailsReducer}from './components/reducers/listReducer'
import {tasksReducer,newtaskReducer,taskReducer,listTasksReducer,taskDetailsReducer} from './components/reducers/taskReducer'

const rootReducer = combineReducers({
  lists:listsReducer,
  newList: newListReducer,
  list:listReducer,
  listDetails: listDetailsReducer,
  tasks:tasksReducer,
  newTask: newtaskReducer,
  task:taskReducer,
  listTasks:listTasksReducer,
  taskDetails:taskDetailsReducer

})


let initialState ={}

const middleware =[thunk];
const store = createStore(rootReducer,initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store