import {
  BrowserRouter,  
  Route,
} from "react-router-dom";
import Header from './components/layout/Header'
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import UpdateList from './components/todo/updateList'


function App() {


  return (
    <> 
      <BrowserRouter>

      <Header/>

        <Route path='/' component={Home}  exact/> 
        <Route path='/list/update/:id' component={UpdateList} exact/> 
       
        <Footer/>
        
      </BrowserRouter>      
    </>
    
  )
}

export default App