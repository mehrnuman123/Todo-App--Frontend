import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateTask,getTaskDetails, getAllTasksOfList ,clearErros } from '../../components/actions/taskActions'
import { UPDATE_TASK_RESET } from '../constants/taskConstants'
import moment from 'moment'
import { OverlayTrigger} from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'

const UpdateTask = ({ history, match }) => {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [marked,setMarked] = useState('');
   

    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { task } = useSelector(state => state.taskDetails)
   console.log(task,'details')
    const { error, isUpdated } = useSelector(state => state.task);
    

    const taskId = match.params.id;

    useEffect(() => {

        if (task && task._id !== taskId) {
            dispatch(getTaskDetails(taskId))
        } else {
           setTitle(task.title)
           setDueDate(task.dueDate,moment(task.dueDate).format('DDDD-MMMM-YYYY'))
           setMarked(task.marked)
        }

        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }

        if (isUpdated) {
            alert.success('task updated successfully')
            history.push('/')
            dispatch({type: UPDATE_TASK_RESET})
            dispatch(getAllTasksOfList(taskId))
        }

    }, [dispatch, alert, error, history, isUpdated, taskId, task])

    const submitHandler = (e) => {
        e.preventDefault();        
        dispatch(updateTask(task._id,{'title':title,'dueDate':dueDate,'marked':marked}))
      
    }
    const renderTooltip = (props) => (
        <Tooltip id="status" {...props}>
          If you check this box, you are not done with task yet. !!
        </Tooltip>
      );
    

    return (
        <Fragment>
        <div className="wrapper my-5" style={{marginRight:'110px'}}>
        <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" onSubmit={submitHandler} encType='multipart/form-data'>
        <div>
                                    <label htmlFor="title_field">Title</label>
                                    <input
                                        type="text"
                                        id="title_field"
                                        className="form-control"
                                        placeholder='Add Task here...'
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                     <label htmlFor="dueDate_field">Due Date</label>
                                    <input
                                        type="date"
                                        id="dueDate_field"
                                        className="form-control"
                                        value={dueDate}
                                        onChange={(e) => setDueDate(e.target.value)}
                                    />
                                    
                                    <div className="row">
                                        <div className="col-md-4">
                                            <input
                                            style={{marginLeft:'53px',marginTop:'56px'}}
                                            type="checkbox"
                                            checked={marked}
                                            onChange={(e) => setMarked(!marked, console.log(marked,'checkbox'))}
                                             />   
                                        </div>
                                        <OverlayTrigger
                                            placement="top"
                                            delay={{ show: 250, hide: 400 }}
                                            overlay={renderTooltip}
                                            >
                                            <div style={{marginTop:'50px'}} className="col-md-4" id='status'>Status</div>
                                            </OverlayTrigger>
                                        <div className="col-md-4">
                                           <button
                                            type="submit"
                                            className="btn btn-primary">Update 
                                            </button>
                                        </div>

                                    </div>
                                   
                                </div>
                               
                            </form>
        </div>
    </Fragment>
    )
}

export default UpdateTask
