import React from 'react'
import { Link } from 'react-router-dom'

const WelcomePage = () => {
  return (
    <div className='container'>
        <h1>Welcome to Notering- A cloud Based User oriented Note Web App</h1>
        <Link to='/home'><h2>Login to Continue</h2></Link>
        
    </div>
  )
}

export default WelcomePage
