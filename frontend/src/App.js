import './App.css';
import {BrowserRouter, Routes, Route, Redirect, Navigate} from 'react-router-dom';

import Home from './pages/Home/Home'; 
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';

import Navigation from './components/shared/Navigation/Navigation';

import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useLoadingWithRefresh } from './hooks/useLoadingWithRefresh';
import Loader from './components/shared/Loader/Loader';
import Room from './pages/Room/Room';


function App() {

  const {loading} = useLoadingWithRefresh();

  return (

    
    loading ? <Loader message={"Loading. please wait... "}/> : (

      <BrowserRouter>

        <Navigation />

        <Routes>
          <Route path='/' exact element={
            <GuestRoute>
              <Home/>
            </GuestRoute>
          } />
          <Route path='/authenticate' element={
            <GuestRoute>
              <Authenticate/>
            </GuestRoute>
          } />
          <Route path="/activate" element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          } />
          <Route path="/rooms" element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          } />
          <Route path="/room/:id" element={
            <ProtectedRoute>
              <Room />
            </ProtectedRoute>
          } />


        </Routes>

      </BrowserRouter>
    )
  );
}

const GuestRoute = ({children, ...rest}) => {

  const {isAuth} = useSelector((state) => state.auth);

  if (isAuth){
    return <Navigate to="/rooms" replace />;
  }
  return children;
}

const SemiProtectedRoute  = ({children, ...rest}) => {

  const {isAuth, user} = useSelector((state) => state.auth);


  if (!isAuth){
    return <Navigate to="/" replace />;
  }
  else {
    if(!user.activated){
      return children;
    }
    return <Navigate to="/rooms" replace />;
  }
}

const ProtectedRoute  = ({children, ...rest}) => {

  const {isAuth, user} = useSelector((state) => state.auth);

  if (!user || !isAuth){
    return <Navigate to="/" replace />;
  }
  else {
    if(user.activated){
      return children;
    }
    return <Navigate to="/activate" replace />;
  }
}

export default App;
