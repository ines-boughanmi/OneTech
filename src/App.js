import './App.css';
import Login from './components/Login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './components/Register/Register';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/login' Component={Login}/> 
        <Route path='/register' Component={Register}/>
        <Route path='/home' Component={Home}/>
      </Routes>
        
    </div>
  );
}

export default App;
