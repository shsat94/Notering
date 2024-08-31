import React, { useContext, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import loadingbarContext from '../context/notes/LoadingbarContext';

const Login = (props) => {
    const host = "https://notering-backend.onrender.com";
    const [credentials, setCreadentials] = useState({ email: '', password: '' });
    const context=useContext(loadingbarContext);
    let navigate = useNavigate();
    const [Pass, setPass] = useState('password');
    const passwordVisibility = () => {
        if (Pass === 'password') {
            setPass('text');
        }
        else {
            setPass('password');
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        context.setProgress(0);
        context.setProgress(30);
        const res = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        context.setProgress(70);
        const json = await res.json();
        console.log(json);
        context.setProgress(100);
        if (json.success) {
            localStorage.setItem('token', json.authToken);
            props.showAlert("Logged in successfully", "success")
            navigate('/home');
        }
        else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }

    const onChange = (e) => {
        setCreadentials({ ...credentials, [e.target.name]: e.target.value })

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
                <div className="mb-1">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type={Pass} className="form-control" value={credentials.password} id="password" onChange={onChange} name='password' />
                    <input type="checkbox" onClick={passwordVisibility} style={{ marginTop: '0.4rem' }} /> <span className='mx-1'>Show Password</span>
                </div>
                <div className='mb-3'>
                    <Link to="/forgetpassword">Forget Password</Link>
                </div>

                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
