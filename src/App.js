import { Route, Routes } from 'react-router-dom';
import Header from './components/blocks/Header';
import './css/App.css';
import Login from './components/pages/Login';
import HeaderOffcanvas from './components/blocks/HeaderOffCanvas';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';
import Home from './components/pages/Home';

function App() {

  const {isAuth, currentUser} = useContext(DContext)

  if(isAuth===null || !currentUser){
    return <LoadingPage/>
  }

  return (
    <div className="container-fluid p-0">
      <Header/>
      
      <Routes>
        <Route path="/" element={isAuth?<Home/>:<Login/>} />
        <Route path="/login" element={isAuth?<Home/>:<Login/>} />
        <Route path='/register' element={isAuth?<Home/>:<Register/>} />
      </Routes>

      <HeaderOffcanvas/>
    </div>
  );
}

export default App;
