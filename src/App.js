import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import {useSelector} from 'react-redux';
function App() {
  const isLogin = useSelector((state)=>state.auth.isAuthenticated);
  return (   
    <BrowserRouter>
      <Routes>
        <Route path='/' element={isLogin ? <Home/> : <Login/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
