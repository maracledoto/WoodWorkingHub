import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register_route } from "../api/routes";
import ReactSVG from "../assets/react.svg";
import { Card, Input, Button } from "antd";

function Register() {
  const [registerForm, setRegisterForm] = useState({
    email: "",
    password: "",
  });
  const [authRes, setAuthRes] = useState(null);

  const handleInputs = (e) => {
    setRegisterForm({
      ...registerForm,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmission = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(register_route, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/");
      } else {
        setAuthRes(data.message);
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
          Sign Up
        </label>
        <form onSubmit={handleSubmission}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={registerForm.email}
            onChange={handleInputs}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={registerForm.password}
            onChange={handleInputs}
          />
          {authRes && (
            <label className="text-red text-center font-poppins">
              {authRes}
            </label>
          )}
          <button type="submit">Sign Up</button>
          <Link to="/" className="text-center td-none font-poppins mt-2">
            Already have an account
          </Link>
        </form>
      </div>
      </Card>
    </div>
  );
}

export default Register;