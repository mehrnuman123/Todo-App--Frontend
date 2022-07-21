import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newTask,getAllTasksOfList,clearErros } from '../actions/taskActions'
import { NEW_TASK_RESET } from '../constants/taskConstants'
import { DELETE_TASK_RESET, } from '../constants/taskConstants'
import { OverlayTrigger} from 'react-bootstrap'
import { Tooltip } from 'react-bootstrap'
const NewTask = ({ history, match}) => {

    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [marked,setMarked] = useState(false);
   
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newTask);
    const {  isDeleted } = useSelector(state => state.task)
        
    const listID = match.params.id;
     
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErros())
        }
    
       
        if (success) {
            alert.success('Task added created successfully');
            dispatch({ type: NEW_TASK_RESET })
            dispatch(getAllTasksOfList(listID))
        }

        
        if (isDeleted) {
            alert.success('Task deleted successfully');
            dispatch({ type: DELETE_TASK_RESET })
        }
        
    }, [dispatch, alert,error, success, history])
    
    const submitHandler = (e) => {
        e.preventDefault();        
        dispatch(newTask({'userListId':listID,'title':title,'dueDate':dueDate,'marked':marked}))
      
    }

    const renderTooltip = (props) => (
        <Tooltip id="status" {...props}>
          If you check this box, you are not done with task yet. !!
        </Tooltip>
      );
    

    return (
                    <Fragment>
                        <div  className="wrapper my-5">
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
                                            onChange={(e) => setMarked(true, console.log(marked,'checkbox'))}
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
                                            className="btn btn-primary">Add
                                            </button>
                                        </div>

                                    </div>
                                   
                                </div>
                               
                            </form>
                        </div>
                    </Fragment>
    
    )
}

export default NewTask
