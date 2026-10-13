import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://carrer-path-d93u.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      // Save token
      localStorage.setItem(
        "token",
        response.data.token
      );

      // Save user information
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      // Update login status in App
      setIsLoggedIn(true);

      setMessage("Login successful!");

      // Go to Home page
      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="page-container">

      <div className="page-header">
        <h1>Login</h1>

        <p>
          Login to continue your CareerPath journey.
        </p>
      </div>

      <form onSubmit={handleLogin}>

        {/* Email */}
        <div>
          <label>Email</label>

          <br />

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />
        </div>

        <br />

        {/* Password */}
        <div>
          <label>Password</label>

          <br />

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>

        <br />

        <button type="submit">
          Login
        </button>

      </form>

      {/* Success Message */}
      {message && (
        <p style={{ color: "green" }}>
          {message}
        </p>
      )}

      {/* Error Message */}
      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

    </div>
  );
}

export default Login;