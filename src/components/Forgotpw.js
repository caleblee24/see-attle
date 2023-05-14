import React, { useState } from 'react';
import userData from '../userData.json';

function ForgotPwPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform email validation
    if (!validateEmail(email)) {
      setError('Invalid email address');
      return;
    }

    // Check if the email exists in userData.json
    const user = userData.find((user) => user.email === email);
    if (user) {
      // Email exists, display success message
      setSuccessMessage('Password reset email sent successfully!');
      setError('');
    } else {
      // Email does not exist, display error message
      setError('Email does not exist. Please try with a different email address.');
      setSuccessMessage('');
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="login-body">
      <header className="headerStyle">
        <div className="container header">
          <img className="downsizeLogo" src="../PageIMGS/See-attleIcon.svg" alt="seattle icon" />
        </div>
      </header>
      <div className="pw-container">
        <div className="pw-find-form">
          <h2>Find Password</h2>
          <p>
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
          <form className="find-pw" onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email"
              required
              aria-label="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
            <button className="reset-pw" type="submit" role="button" aria-label="Click here to request reset password email">
              Submit
            </button>
          </form>
        </div>
      </div>
      <footer className="footerStyle">
        <div className="container footerDivStyle">
          <p className="footerDivTextStyle underline">Contact Us</p>
          <p className="footerDivTextStyle underline">Terms</p>
          <p className="footerDivTextStyle underline">Privacy</p>
          <p className="footerDivTextStyle">&#169; Info 340: Group-BB4</p>
        </div>
      </footer>
    </div>
  );
}

export {ForgotPwPage}





