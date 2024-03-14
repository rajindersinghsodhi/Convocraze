import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.scss';
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import { useContext } from 'react';
import { AuthContext } from './Context/AuthContext';

function App() {

  const {currentUser} = useContext(AuthContext);
  
  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    }

    return children
  }
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          }/>
          <Route path="login" element={<Login/>}/>
          <Route path="register" element={<Register/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
