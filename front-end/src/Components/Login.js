import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return false;
    }

    let result = await fetch("https://mern-api-zuqe.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    result = await result.json();

    if (result.auth) {
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/home");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <h1>Login</h1>
      <form
        style={{ height: "300px", display: "flex", flexDirection: "column" }}
      >
        <input
          value={email}
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        {error && !email && (
          <span
            style={{
              color: "red",
              position: "relative",
              right: "45px",
              bottom: "10px",
            }}
          >
            Enter a valid email
          </span>
        )}
        <input
          value={password}
          type="password"
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && !password && (
          <span
            style={{
              color: "red",
              position: "relative",
              right: "35px",
              bottom: "10px",
            }}
          >
            Enter a valid password
          </span>
        )}
        <button type="button" onClick={handleLogin}>
          Sign In
        </button>
        <p>
          Forgot your password?{" "}
          <Link to="/forgot-password" style={{ textDecoration: "none" }}>
            Reset it
          </Link>
        </p>

        <p>
          Don't have an account?{" "}
          <Link to="/signup" style={{ textDecoration: "none" }}>
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
