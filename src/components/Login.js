import React, { useState } from 'react';
import userData from '../userData.json';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login validation
    const user = userData.find((user) => user.email === email);
    if (user) {
      // Check password or any other authentication logic
      if (password === user.password) {
        // Successful login
        setError('');
        console.log('Logged in as:', user.displayName);
        console.log('Email:', user.email);
        // Redirect to the desired page or update the login state
      } else {
        setError('Incorrect Password');
      }
    } else {
      setError('Invalid Email');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Login</h1>
        <form className="login" onSubmit={handleLogin}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email"
            aria-label="Input email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            aria-label="Input password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="login-button" type="submit" role="button">
            Login
          </button>
          {error && <p className="error-message">{error}</p>}
          <p>
            Don't have an account? <a href="#">Create an account</a>
          </p>
          <p>
            Forgot your password? <a href="#">Find my account</a>
          </p>
        </form>
      </div>
    </div>
  );
}

export {LoginPage}

