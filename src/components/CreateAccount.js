import React, { useState } from 'react';
import { LoginHeader } from './LoginHeader';
import { Footer } from './Footer';

function CreateAccountPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userInfo = {
      id: Date.now(), // this will serve as a unique id for the user, as it's the timestamp of when they submit the form.
      displayName: username,
      username,
      email,
      password,
      pfp: {} // the pfp field will be an empty object initially
    };
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    setStatusMessage("Account created successfully!");
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

export {CreateAccountPage}



