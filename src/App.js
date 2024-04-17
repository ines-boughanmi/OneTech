import './App.css';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import DashBoard from './components/DashBoard/DashBoard';
import Profile from './components/Profile/Profile';
import Consultants from './components/Consultants/Consultants';
import AddProject from './components/AddProject/AddProject';
import Contact from './components/Contact/Contact';
import UpdateProject from './components/UpdateProject/UpdateProject';
import Assignment from './components/Assignment/Assignment';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' Component={Login}/> 
        <Route path='/register' Component={Register}/>

        <Route path='/dash' Component={DashBoard}/>
        <Route path='/profile' Component={Profile}/>
        <Route path='/consultants' Component={Consultants}/>
        <Route path='/add' Component={AddProject}/>
        <Route path='/contact' Component={Contact}/>
        <Route path='/update/:id' Component={UpdateProject}/>
        <Route path='/assignment' Component={Assignment}/>
        

      </Routes>
        
    </div>
  );
}

export default App;
