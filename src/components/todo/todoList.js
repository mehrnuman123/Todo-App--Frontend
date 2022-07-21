import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { deleteList, clearErros } from '../actions/listActions'
import { DELETE_LIST_RESET, LIST_DETAILS_FAIL } from '../constants/listConstants'
import { getLists,newList } from '../actions/listActions'


const TodoList = ({ history }) => {

    const alert = useAlert();
    const dispatch = useDispatch();
 
    const { loading, error, lists } = useSelector(state => state.lists);
    const {  isDeleted } = useSelector(state => state.list)
  
   console.log('lists data', lists);
    useEffect(() => {
        dispatch(getLists());
     
        if (error) {
            alert.error(error);
            dispatch(clearErros())
        }



        if (isDeleted) {
            alert.success('list deleted successfully');
            dispatch({ type: DELETE_LIST_RESET })
        }

    }, [dispatch, alert, error, isDeleted, history])

    const deleteListHandler = (id) => {
        dispatch(deleteList(id))
      
    }


    const setList = () => {
        const data = {
            columns: [
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }

        lists.forEach(list => {
            data.rows.push({
                id:list._id,
                name: list.name,
                actions: <Fragment>
                    <Link to={`/list/update/${list._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteListHandler(list._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                    <Link  to={`/new/task/${list._id}`} className="btn btn-green py-1 px-2">
                     <i className="fa fa-tasks" aria-hidden="true"></i>
                    </Link>
                </Fragment>
                
            })
           
        })
         
        return data;
    }

    

    return (

                    <Fragment>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setList()}
                                className="px-3"
                                bordered
                                searching={false}

                                paging={false}
                        
                                hover
                            />
                        )}

                    </Fragment>
    )
}

export default TodoList
