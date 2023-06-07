import React, { useState, useEffect } from 'react';
// import userData from '../userData.json';
import { Footer } from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import { LoginHeader } from './LoginHeader';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/data/userData.json")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Perform login validation
    const user = userData.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      setError('');
      onLogin(true);
      localStorage.setItem('user', user.username);
      navigate('/home');
    } else {
      setError('Invalid Email or Password');
    }
  };


  return (
    <div className="login-body">
      <LoginHeader />
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
            <button type="submit" className="login-button" role="button">
              Login
            </button>
            {error && <p className="error-message">{error}</p>}
            <p>
              Don't have an account? <Link to="/createAccount">Create an account</Link>
            </p>
            <p>
              Forgot your password? <Link to="/forgotPw">Reset Password</Link>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { LoginPage };
