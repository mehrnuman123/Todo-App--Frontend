import {
  BrowserRouter,  
  Route,
} from "react-router-dom";
import React,{Fragment}from 'react'
import MetaData from './layout/MetaData'
import TodoList from './todo/todoList'
import NewList from './todo/newList'

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import NewTask from './todo/newTask';
import TodoTask from "./todo/todoTask";
import Header from '../components/layout/Header'
import UpdateTask from "./todo/updateTask";
import UpdateList from "./todo/updateList";


function Home() {


  return (
    <Fragment>
        <BrowserRouter>
      <MetaData title={'Todo Home'}/>
        <Container>
            <Row>
              <Col xs={4} md={4}>
                 <Row><NewList></NewList></Row>
                 <Row><Route path='/list/update/:id' component={UpdateList} exact/></Row> 
                 <Row><TodoList></TodoList></Row>
              </Col>
              <Col xs={8} md={8}>
                  <div className="container-fluid" style={{marginLeft:'150px'}}>
                  <Row><Route path='/new/task/:id' component={NewTask}  exact/></Row> 
                  <Row><Route path='/new/task/:id' component={TodoTask}  exact/></Row>
                  <Row><Route path='/task/update/:id' component={UpdateTask} exact/></Row>
                  </div>
                 
              </Col>
          </Row>
        </Container>
       
        </BrowserRouter>
    </Fragment>
  )
}

export default Home