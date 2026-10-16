// src/components/Login.jsx
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { login, signup, error, setError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic Form Validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address containing '@'.");
      return;
    }
    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (isSignup) {
      if (!name.trim()) {
        setError("Full name is required for registration.");
        return;
      }
      const success = signup(name, email, password);
      if (success) {
        // Switch back to login view so they can sign in manually
        setIsSignup(false);
        setPassword(""); // Clear password field for security/clean login
        setError("");
      }
    } else {
      const success = login(email, password);
      if (success) navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-container" style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>{isSignup ? "Traveler Registration" : "Traveler Login"}</h2>
      
      {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        {isSignup && (
          <div style={{ marginBottom: "15px" }}>
            <label>Full Name:</label><br />
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Enter your full name"
              style={{ width: "100%", padding: "8px", marginTop: "4px" }}
            />
          </div>
        )}

        <div style={{ marginBottom: "15px" }}>
          <label>Email Address:</label><br />
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter email address"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Password:</label><br />
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password (min 6 chars)"
            style={{ width: "100%", padding: "8px", marginTop: "4px" }}
          />
        </div>

        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          {isSignup ? "Sign Up" : "Login"}
        </button>
      </form>

      <p style={{ marginTop: "15px", textAlign: "center" }}>
        {isSignup ? "Already registered?" : "Don't have an account?"}{" "}
        <button 
          type="button" 
          onClick={() => { setIsSignup(!isSignup); setError(""); }}
          style={{ background: "none", border: "none", color: "#007BFF", cursor: "pointer", textDecoration: "underline" }}
        >
          {isSignup ? "Log in here" : "Sign up here"}
        </button>
      </p>
    </div>
  );
}

export default Login;