import React, { useContext,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loadingbarContext from '../context/notes/LoadingbarContext';

const ForgetPassword = (props) => {
    const host = "https://notering-backend.onrender.com";
    const context=useContext(loadingbarContext);
    const [credentials, setCreadentials] = useState({ email: '', otp: '', password: '' });
    const [disbale, setdiable] = useState(true);
    const [otpDisable, setOtpDisable] = useState(false);
    const [sendOtpLabel, setSendOtpLabel] = useState('Send OTP');
    const [genOTP, setgenOTP] = useState('');
    const [resetPasswordFormDisplay, setResetPasswordFormDisplay] = useState('d-none');
    let navigate=useNavigate();
    const [Pass, setPass] = useState('password');
    const passwordVisibility = () => {
        if (Pass === 'password') {
            setPass('text');
        }
        else {
            setPass('password');
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (credentials.otp.toString() === genOTP.toString()) {
            setResetPasswordFormDisplay('');
            setdiable(true);
            setOtpDisable(true);
        }
        else {
            props.showAlert("Incorrect OTP", "danger");
        }
    }



    const handleSendOTP = async (e) => {
        e.preventDefault();
        context.setProgress(30);
        
        const res = await fetch(`${host}/api/forgetpass/send-otp`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email })
        });
        context.setProgress(70);
        const response = await res.json();
        setgenOTP(response.generatedOtp);
        props.showAlert("OTP is send to your email id", "success");
        setSendOtpLabel('Resend OTP');
        context.setProgress(100);
        setdiable(false);

    }
    
    const submitPassword = async(e) => {
        context.setProgress(0);
        e.preventDefault();
        const res = await fetch(`${host}/api/forgetpass/resetpass`, {
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        context.setProgress(70);
        const response=await res.json();
        context.setProgress(100);
        props.showAlert(response,"success");
        navigate('/login');
    }


    const onChange = (e) => {
        setCreadentials({ ...credentials, [e.target.name]: e.target.value });
    }
    return (
        <>
            <form>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} id="email" aria-describedby="emailHelp" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-2">
                    <button type="submit" className="btn btn-primary" disabled={otpDisable} onClick={handleSendOTP}>{sendOtpLabel}</button>
                </div>
                <div className="mb-3">
                    <label htmlFor="otp" className="form-label">Enter your OTP</label>
                    <input type="password" className="form-control" name='otp' value={credentials.otp} id="otp" aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-2">
                    <button type="submit" disabled={disbale} className="btn btn-primary" onClick={handleSubmit} >Submit</button>
                </div>

            </form>

            {/* form for the create new password */}
            <div className={`my-3 ${resetPasswordFormDisplay}`}>
                <h5>Create a new password</h5>
                <form onSubmit={submitPassword}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={Pass} className="form-control" value={credentials.password} name='password' id="password" onChange={onChange} required minLength={5} />
                        <input type="checkbox" onClick={passwordVisibility} style={{ marginTop: '0.4rem' }} /> <span className='mx-1'>Show Password</span>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Cpassword" className="form-label">Confirm Password</label>
                        <input type={Pass} className="form-control" id="Cpassword" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    )
}

export default ForgetPassword
