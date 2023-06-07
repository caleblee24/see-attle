import React, { useState } from 'react';
import { LoginHeader } from './LoginHeader';
import { Footer } from './Footer';

function CreateAccountPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      id: Date.now(),
      displayName: username,
      username,
      email,
      password,
      pfp: {}
    };

    try {
      const response = await fetch('/data/userData.json');
      const userData = await response.json();

      // Add the new user to the existing user data
      const updatedUserData = [...userData, userInfo];

      // Save the updated user data back to userData.json
      await fetch('/data/userData.json', {
        method: 'PUT',
        body: JSON.stringify(updatedUserData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setStatusMessage('Account created successfully!');
      console.log('Updated userData:', updatedUserData); // Log the updated userData array
    } catch (error) {
      console.error('Error:', error);
      setStatusMessage('An error occurred while creating the account.');
    }
  };

  return (
    <div className="login-body">
      <LoginHeader />
      <div className="account-container">
        <div className="account-box">
          <h1>Create Account</h1>
          <form className="account" onSubmit={handleSubmit}>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required placeholder="Enter Username" value={username} onChange={handleUsernameChange} />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="Enter Email" value={email} onChange={handleEmailChange} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
            <button className="create-account" type="submit" aria-label="Click here to create account">
              Create Account
            </button>
            {statusMessage && <p>{statusMessage}</p>}
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export { CreateAccountPage };




