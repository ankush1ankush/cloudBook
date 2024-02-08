import React, {useContext, useState } from 'react'
import {Link,useLocation, useNavigate} from "react-router-dom";

 import NoteContext from '../context/notes/NoteContext';
 
export default function Navbar() {
    
    const Navigate=useNavigate();
    const context = useContext(NoteContext);
    const {user,setuser} = context;
    function handleClick()
    {
        localStorage.removeItem("token");
        
        setuser(false);

        Navigate("/login")
        console.log(user);
        
    }
  let location = useLocation();
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CloudNoteBook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <Link className={`nav-link ${location.pathname==='/'?"active":" "}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/about'?"active":" "}`} to="/about">About</Link>
        </li>
      </ul>
      <form className="d-flex" role="search">
      {user?null:<Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>}
      {user?null:<Link className="btn btn-primary" to="/signup" role="button">Sign Up</Link>}
      {user?<button className="btn btn-primary"  onClick={handleClick} >logout</button>:null}
      </form>
    </div>
  </div>
</nav>
    </div>
  )
}
