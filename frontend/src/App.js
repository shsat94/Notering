import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import LoadingbarState from './context/notes/LoadinbarState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import {useState } from 'react';
import ForgetPassword from './components/ForgetPassword';
import WelcomePage from './components/WelcomePage';



function App() {
  const [alert, setAlert] = useState(null);
  

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }


  return (
    <>
      <NoteState>
        <LoadingbarState>
          <Router>
            <Navbar />
            <Alert alert={alert} />
            <div className="container">
              <Routes>
                
                <Route exact path='/' element={<WelcomePage/>}></Route>
                <Route exact path='/home' element={<Home showAlert={showAlert} />}></Route>
                <Route exact path='/about' element={<About />}></Route>
                <Route exact path='/login' element={<Login showAlert={showAlert} />}></Route>
                <Route exact path='/signup' element={<Signup showAlert={showAlert} />}></Route>
                <Route exact path='/forgetpassword' element={<ForgetPassword showAlert={showAlert} />}></Route>

              </Routes>
            </div>
          </Router>
        </LoadingbarState>
      </NoteState>
    </>
  );
}

export default App;
