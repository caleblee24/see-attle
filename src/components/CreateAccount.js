import React from 'react';


function CreateAccountPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your account creation logic here
  };

  return (
    <div className="login-body">
      <header className="headerStyle">
        <div className="container header">
          <img className="downsizeLogo" src="../PageIMGS/See-attleIcon.svg" alt="seattle icon" />
        </div>
      </header>
      <div className="account-container">
        <div className="account-box">
          <h1>Create Account</h1>
          <form className="account" onSubmit={handleSubmit}>
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

export {CreateAccountPage}
