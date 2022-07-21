import React, { Fragment, useState, useEffect } from 'react'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { newList,getLists, clearErros } from '../actions/listActions'
import { NEW_LIST_RESET } from '../constants/listConstants'
import {Row }from 'react-bootstrap'
const NewList = ({ history }) => {

    const [name, setName] = useState('');
    const alert = useAlert();
    const dispatch = useDispatch();

    const { loading, error, success } = useSelector(state => state.newList);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErros())
        }

        if (success) {
            alert.success('List created successfully');
            dispatch({ type: NEW_LIST_RESET })
            dispatch(getLists())
        }

    }, [dispatch, alert, error, success, history])

    const submitHandler = (e) => {
        e.preventDefault();        
        dispatch(newList({'name':name}))
    }

  
    return (
                    <Fragment>
                        <div className="wrapper my-5">
                            <form className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2" onSubmit={submitHandler} encType='multipart/form-data'>      
                                    <Row>
                                    <label htmlFor="name_field" style={{marginTop:'50px'}}>Name :</label>
                                    <input
                                        style={{width: '160px',marginLeft:12,marginTop:'40px'}}
                                        type="text"
                                        id="form1"
                                        className="form-control"
                                        placeholder='Add list here'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                
                                       <button type="submit" 
                                       
                                         className="btn btn-primary lg">
                                        Add
                                      </button>

                                    </Row>
                                    

                                
                            </form>
                        </div>
                        
                    </Fragment>
    
    )
}

export default NewList
