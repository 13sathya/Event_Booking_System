import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';

function OwnerLoginscreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  function OwnerLogin() {
    const hardcodedEmail = 'owner@gmail.com';
    const hardcodedPassword = 'owner@gmail.com';

    if (!email || !password) {
      setError('Please fill in both fields');
      return;
    }

    try {
      setLoading(true);
      setError('');

      if (email === hardcodedEmail && password === hardcodedPassword) {
        setLoading(false);
        localStorage.setItem('currentOwner', JSON.stringify({ email }));
        window.location.href = '/admin';
      } else {
        setLoading(false);
        setError('Invalid Credentials');
      }
    } catch (err) {
      setLoading(false);
      setError('Something went wrong. Please try again.');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5 mt-5'>
          {error && <Error msg={error} />}
          <div className='bs'>
            <h2>Owner Login</h2>
            <input
              type='email'
              className='form-control'
              placeholder='Email'
              value={email}
              onFocus={() => setEmail('')} // Clear on focus
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="new-email" // Unique autocomplete value
            />
            <input
              type='password'
              className='form-control'
              placeholder='Password'
              value={password}
              onFocus={() => setPassword('')} // Clear on focus
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" // Unique autocomplete value
            />
            <button
              className='btn mt-3'
              onClick={OwnerLogin}
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

export default OwnerLoginscreen;
