import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';

function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  async function register() {
    // Input validation
    if (!name) {
      setError('Name is required');
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Valid email is required');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (!confirmpassword) {
      setError('Confirm password is required');
      return;
    }

    if (password !== confirmpassword) {
      setError('Passwords do not match');
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      setSuccess(false); // Clear previous success state
      const result = (await axios.post('/api/users/register', user)).data;

      setLoading(false);
      setSuccess(true);

      // Clear form fields after successful registration
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError('Registration failed. Please try again.');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      {error && <Error msg={error} />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {success && <Success message='Registration Successful' />}

          <div className='bs'>
            <h2>Register</h2>

            {/* Name Input */}
            <label>
              Name <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='text'
              className='form-control'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {/* Email Input */}
            <label>
              Email <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password Input */}
            <label>
              Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* Confirm Password Input */}
            <label>
              Confirm Password <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type='password'
              className='form-control'
              placeholder='Confirm Password'
              value={confirmpassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {/* Register Button */}
            <button className='btn mt-3' onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
