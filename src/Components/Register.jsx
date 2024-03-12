import React from 'react';
import logo from '../appLogo.png';
import './LoginRegister.scss';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
function Register() {
  return (
    <div className='container'>
        <img src={logo} alt="" />
        <div className='form__container'>
            <span className='form__title'>Register</span>
            <form action="">
                <input type="text" placeholder='Your name here'/>
                <input type="email" placeholder='Email'/>
                <input type="password" placeholder='Password' />
                <input style={{display: "none"}} type="file" id='file'/>
                <label htmlFor="file">
                    <AddPhotoAlternateIcon/>
                    <span>Add Profile Picture</span>
                </label>
                <button>Sign Up</button>
            </form>
            <p>Already have an account? Login Now</p>
        </div>
    </div>
  )
}

export default Register