import React from 'react';
import {Link,useLocation, useNavigate} from 'react-router-dom';


const Navbar = () => {
    let location= useLocation();
    let navigate= useNavigate();
    const handlelogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/home">Notering</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/home'?'active':""}` } aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==='/about'?'active':""}` }aria-current="page" to="/about">About</Link>
                            </li>
                            
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex" role="search">
                            <Link to="/login" role='button' className="btn btn-primary mx-1">Login</Link>
                            <Link to="/signup" role='button' className="btn btn-primary mx-1">Signup</Link>
                            
                        </form>:<button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
