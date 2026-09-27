import { useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

function SignIn() {
  const [name, setName] = useState("");

  const { signIn } = useAuth();

  const navigate = useNavigate();

  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  function handleSubmit(event) {
    event.preventDefault();

    if (!name.trim()) {
      return;
    }

    signIn(name.trim());

    navigate(from, {
      replace: true,
    });
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-logo">Addis Eats</div>

        <div className="auth-icon">👋</div>

        <p className="section-label">WELCOME BACK</p>

        <h1>Sign In</h1>

        <p className="auth-description">
          Sign in to continue to your checkout and complete your order.
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Your Name
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <button type="submit">Continue</button>
        </form>

        <Link className="auth-back" to="/">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
