import React,{ useState }  from 'react'


const Login = () => {
  const [credentials,setCredentials] = useState({email:"",password:""})
  const handleSubmit = async (e)=>{
    e.preventDeafult();
      //api call
      const response = await fetch(`http://localhost:5000/api/auth/login`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password})
      })
      const json = await response.json();
      console.log(json);
      
    }
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
}
  
  return (
    <div>
<form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email"><b>Email </b></label>
            <input type="email" className="form-control my-2" id="email" value={credentials.email} onChange={onChange}  name='email' aria-describedby="emailHelp" placeholder="Enter email"/>
          </div>
          <div className="form-group">
            <label htmlFor="password"><b>Passoword</b></label>
            <input type="password" className="form-control my-2" id="passoword" value={credentials.password}  onChange={onChange}  name = 'password' placeholder="Password"/>
          </div>
          <button type="submit" className="btn btn-primary my-2" >Submit</button>
</form>
    </div>
  )
}
export default Login
