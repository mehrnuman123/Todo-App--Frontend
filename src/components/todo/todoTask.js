import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, clearErros } from '../actions/taskActions'
import { DELETE_TASK_RESET, TASK_DETAILS_FAIL } from '../constants/taskConstants'
import { getAllTasksOfList } from '../actions/taskActions'
import moment from 'moment'


const TodoTask = ({ history, match}) => {

    const alert = useAlert();
    const dispatch = useDispatch();
 
    const { loading, error, tasks } = useSelector(state => state.listTasks);
    const {  isDeleted } = useSelector(state => state.task)
    const {list }= useSelector(state => state.listDetails)

    console.log('tasks ',tasks)
            
    const listID = match.params.id;  
    useEffect(() => {
         dispatch(getAllTasksOfList(listID))
        if (error) {
            alert.error(error);
            dispatch(clearErros())
        }
        if (isDeleted) {
            alert.success('task deleted successfully');
            dispatch({ type: DELETE_TASK_RESET })
        }

      
    }, [dispatch, alert, error,history,isDeleted,listID])

    const deleteTaskHandler = (id) => {
        dispatch(deleteTask(id))
        console.log('delete clicked');
    }

    const setTaskList = () => {
        const data = {
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    sort: 'asc'
                },
                {
                    label: 'Due Date',
                    field: 'dueDate',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'marked',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        tasks.forEach(task => {
            data.rows.push({
                id: task._id,
                userlistId:task.userlistId,
                title: task.title,
                dueDate: moment(task.dueDate).format('MMMM Do YYYY'),
                marked:<Fragment >
                    {task.marked === false ? (
                    <>
                       <p>Done</p>
                    </>
                    ):(<>
                    <i className="fas fa-exclamation-triangle" style={{color:'red',height:'20px',marginLeft:'10px'}}></i>
                    </>)}
                </Fragment>,
                actions: <Fragment>
                    <Link to={`/task/update/${task._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteTaskHandler(task._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </Fragment>
            })
        })

        return data;
    }
  
    
    

    return (
        <Fragment>
            {tasks ? (
                <div className="row">
                    <span style={{marginLeft:'35px',marginbottom:'10px'}}>Showing Tasks of List</span>
                <div className="col-12 col-md-10">
                    <Fragment>
        
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setTaskList()}
                                className="px-3"
                                bordered
                                searching={false}
                                paging={false}
                        
                              
                            />
                        )}

                    </Fragment>
                </div>
            </div>
            ): (
                <h4>Hurrah! No Todo For this List</h4>
            )}
            

        </Fragment>
    )
}

export default TodoTask
