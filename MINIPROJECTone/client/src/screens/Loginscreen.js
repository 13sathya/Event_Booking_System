import React, { useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader';
import Error from '../components/Error';

function Loginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function Login() {
    const user = {
      email,
      password,
    };

    // Basic input validation
    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      setError(''); // Clear previous errors
      const response = await axios.post('/api/users/login', user);

      setLoading(false);

      // If login is successful, store user and navigate to home
      if (response.data) {
        localStorage.setItem('currentUser', JSON.stringify(response.data));
        window.location.href = '/home';
      } else {
        setError('Invalid Credentials'); // If no user data returned
      }

    } catch (err) {
      setLoading(false);

      // Handle specific errors, such as 401 Unauthorized
      if (err.response && err.response.status === 401) {
        setError('Invalid Credentials'); // Show this error for incorrect login
      } else {
        setError('Something went wrong. Please try again.'); // General error
      }
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {error && <Error msg={error} />}
          <div className='bs'>
            <h2>Login</h2>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              // type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className='btn mt-3'
              onClick={Login}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginscreen;
