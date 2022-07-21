import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updateList,getLists,getListDetails, clearErros } from '../actions/listActions'
import { UPDATE_LIST_RESET } from '../constants/listConstants'

const UpdateList = ({ history, match }) => {

    const [name, setName] = useState('')
    const alert = useAlert();
    const dispatch = useDispatch();
    
    const { list } = useSelector(state => state.listDetails)
    console.log('list details from store', list)
    const { error, isUpdated } = useSelector(state => state.list);
    

    const listId = match.params.id;

    useEffect(() => {

        if (list && list._id !== listId) {
            dispatch(getListDetails(listId))
        } else {
            setName(list.name);
        }

        if (error) {
            alert.error(error);
            dispatch(clearErros());
        }

        if (isUpdated) {
            alert.success('list updated successfully')
            history.push('/')
            dispatch({type: UPDATE_LIST_RESET})
            dispatch(getLists())
        }

    }, [dispatch, alert, error, history, isUpdated, listId, list])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateList(list._id,{'name':name}))
        console.log('form submission',name)
      
    }


    return (
        <Fragment>
        <div className="wrapper my-5">
            <form onSubmit={submitHandler} encType='multipart/form-data'>
                <div>
                    <label htmlFor="name_field">Update Details</label>
                    <input
                        type="text"
                        id="name_field"
                        className="form-control"
                        placeholder='Add list here'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                     <button
                    id="add_btn"
                    type="submit"
                    className="btn btn-block py-3">
                        update
                </button>
                </div>
               
            </form>
        </div>
    </Fragment>
    )
}

export default UpdateList
