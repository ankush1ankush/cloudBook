import React,{ useState,useContext }  from 'react'
import NoteContext from '../context/notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   
    const context = useContext(NoteContext);
    const {user,setuser} = context;
    const navigate=useNavigate();
  const [credentials,setCredentials] = useState({email:"",password:""})
  
  const handleSubmit = async (e)=>{
    //e.preventDeafult();  spelling mistake
    e.preventDefault()
      //api call
      const response = await fetch(`http://localhost:5000/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password})
      })
      const json = await response.json();

     if(json.error==="Please try to login with right credential")
     {

       alert("Please try to login with right credential")
     }else if(json.authToken){

        localStorage.setItem("token",json.authToken)
        setuser(true);
        //console.log(json);
        navigate("/home")

     }

      
    
      
    }


    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
     // console.log(credentials)
      }
  
  return (
    <div>
<form >
          <div className="form-group">
            <label htmlFor="email"><b>Email </b></label>
            <input type="email" className="form-control my-2" id="email" value={credentials.email} onChange={onChange}  name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password"><b>Passoword</b></label>
            <input type="password" className="form-control my-2" id="passoword" value={credentials.password}  onChange={onChange}  name = 'password' placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary my-2" onClick={handleSubmit}   >Submit</button>
</form>
    </div>
  )
}
export default Login
