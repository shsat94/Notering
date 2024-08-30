import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCreadentials]=useState({name:'',email:'',password:'',Cpassword:''});
  let navigate= useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password}=credentials;
    const res = await fetch(`https://notering-backend.onrender.com/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name,email,password })
    });
    const json = await res.json();
    console.log(json);
    if (json.success) {
      localStorage.setItem('token', json.authToken);
      props.showAlert("Account Created Successfully","success")
      navigate('/home');
    }
    else {
      props.showAlert("Invalid Credentials","danger")
    }
  }

  const onChange = (e) => {
    setCreadentials({ ...credentials, [e.target.name]: e.target.value })

  }
  return (
    <div className='container'>
      <h2>Signup to continue</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name='name' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" onChange={onChange} required minLength={5} />
        </div>
        <div className="mb-3">
          <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='Cpassword' id="Cpassword" onChange={onChange} required minLength={5} />
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
