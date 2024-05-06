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
import Planning from './components/AddProject/Planning';
import InformationProject from './components/ProjectDashboard/InformationProject';
import Schedule from './components/ConsultantDashBoard/Schedule';
import OneMissionDetails from './components/ConsultantDashBoard/OneMissionDetails';
import PrintPage from './components/PrintPage/PrintPage';
import Analytics from './components/Analytics/Analytics';

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
        <Route path='/analytics' Component={Analytics}/>
        <Route path='/update/:id' Component={UpdateProject}/>
        <Route path='/planning/:id' Component={Planning}/>
        <Route path='/assignment' Component={Assignment}/>
        <Route path='/information/:id' Component={InformationProject}/>
        <Route path='/schedule' Component={Schedule}/>
        <Route path='/mission/:id' Component={OneMissionDetails}/>
        <Route path='printPage' Component={PrintPage}/>
      </Routes>
        
    </div>
  );
}

export default App;
