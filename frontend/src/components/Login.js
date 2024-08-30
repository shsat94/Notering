import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials,setCreadentials]=useState({email:'',password:''});
    let navigate= useNavigate();
    
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const res = await fetch(`https://notering-backend.onrender.com/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email:credentials.email,password:credentials.password })
        });
        const json= await res.json();
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken);
            props.showAlert("Logged in successfully","success")
            navigate('/home');
        }
        else{
            props.showAlert("Invalid Credentials","danger")
        }
    }

    const onChange=(e)=>{
        setCreadentials({...credentials,[e.target.name]:e.target.value})

    }
    return (
        <div className='container'>
        <h2>Login to continue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password}id="password" onChange={onChange} name='password'/>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
