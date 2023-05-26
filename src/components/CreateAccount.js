import React from 'react';
import { LoginHeader } from './LoginHeader';
import { Footer } from './Footer';


function CreateAccountPage() {
  return (
    <div className="login-body">
      <LoginHeader />
      <div className="account-container">
        <div className="account-box">
          <h1>Create Account</h1>
          <form className="account">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required placeholder="Enter Username" />
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" required placeholder="Enter Email" />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required placeholder="Enter Password" />
            <button className="create-account" type="submit" aria-label="Click here to create account">
              Create Account
            </button>
          </form>
        </div>
      </div>
      <Footer />s
    </div>
  );
}

export {CreateAccountPage}
