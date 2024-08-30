import React from 'react';


const About = () => {

  return (
    <div>
      <div className="card" style={{width: '18rem}'}}>
        <div className="card-body">
          <h5 className="card-title">About the Creator</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary">Velociraptor aka Satyarth Sharma</h6>
          <p className="card-text">This is my first fullstack web app using the MERN stack</p>
          <a href="https://github.com/shsat94" rel="noreferrer" target='_blank' className="card-link">Github</a>
          <a href="https://www.linkedin.com/in/satyarth-sharma/" target='_blank' rel="noreferrer" className="card-link">Linkedin</a>
        </div>
      </div>
    </div>
  )
}

export default About
