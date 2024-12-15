import { Link } from "react-router-dom";
import { useState } from "react";
import { login_route } from "../api/routes.js";
import ReactSVG from "../assets/react.svg";
import { Card, Input, Button } from "antd";
function Login() {
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setFormLogin({
      ...formLogin,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(login_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formLogin),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        window.location.href = "/products";
      } else {
        setAuthRes("Please Try Again!");
      }
    } catch (error) {
      console.log(error);
      setAuthRes("Please Try Again");
    }
  };

  return (
    <div className="login-container">
      <Card
        style={{
          width: 500,
        }}
      >
        <div className="main">
          <label className="font-header font-poppins font-bold mb-3">
            Sign In
          </label>
          <form onSubmit={handleSubmission}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formLogin.email}
              onChange={handleInputs}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formLogin.password}
              onChange={handleInputs}
              required
            />
            {authRes && (
              <label className="text-red text-center font-poppins">
                {authRes}
              </label>
            )}
            <button className="font-poppins" type="submit">
              Sign In
            </button>
            <Link
              to="/register"
              className="text-center td-none font-poppins mt-2"
            >
              Dont have an account? Sign Up
            </Link>
          </form>
        </div>
      </Card>
    </div>
  );
}

export default Login;
