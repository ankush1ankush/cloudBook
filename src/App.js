import React, { useEffect, useState ,useContext} from 'react';
import './App.css';
import About from './components/About'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Alert from './components/Alert';

import NoteContext from './context/notes/NoteContext';
import {
 
    Routes,
    Route,
  } from "react-router-dom";
import Login from './components/Login';
import Signup from './components/Signup';
import { Navigate } from 'react-router-dom';
function App() {
    const context = useContext(NoteContext);
    const {user} = context;
    
  
  
  return (
    <>
   
    
   
        <Navbar/>
        
        <Alert message = {"this is the most susccs life"}/>
        <div className="container">
        <Routes>
              <Route path="/home" element={user?<Home/>:<Navigate to="/login" replace={true} />} />
              <Route path="/about" element={<About/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
        </Routes>
        </div>
        
   
   
    </>
  );
}

export default App;
