import React, { useContext, useState } from 'react';
import Authcontext from "../Authcontext/Authcontext";
import { useNavigate ,NavLink } from "react-router-dom";

const Login = () => {
  const { user, signIn } = useContext(Authcontext);
  const [Email, setEmail] = useState("");
  const [password, setpasseord] = useState("");
  const navigate = useNavigate();

  const handalesubmit = async (e) => {
    e.preventDefault();
    

    try {
      await signIn(Email, password);
      navigate("/");
    } catch (error) {
      console.error('Error signing in:', error.message);
      navigate("/signup");
    }
  }

  return (
    <div className="container mt-5">
      <form onSubmit={handalesubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type='email'
            className="form-control"
            id="email"
            value={Email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]$"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type='password'
            className="form-control"
            id="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setpasseord(e.target.value)}
            required
          />
        </div>
        <button type='submit' className="btn btn-primary">Login</button>
            <NavLink to= "/signup" className="btn btn-sucess m-2"> new user </NavLink>
      </form>
    </div>
  )
}

export default Login;
