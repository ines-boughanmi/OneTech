import './App.css';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Home from './components/Home/Home';
import DashBoard from './components/DashBoard/DashBoard';
import Profile from './components/Profile/Profile';
import Consultants from './components/Consultants/Consultants';
import AddProject from './components/AddProject/AddProject';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' Component={Login}/> 
        <Route path='/register' Component={Register}/>
        <Route path='/' Component={Home}/>
        <Route path='/dash' Component={DashBoard}/>
        <Route path='/profile' Component={Profile}/>
        <Route path='/consultants' Component={Consultants}/>
        <Route path='/add' Component={AddProject}/>
      </Routes>
        
    </div>
  );
}

export default App;
