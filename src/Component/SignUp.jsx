import React, { useContext, useState } from 'react';
import AuthContext from "../Authcontext/Authcontext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Fill all the fields");
    }

    try {
      await signUp(name, email, password);
      navigate("/login"); 
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="container mt-5">
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type='text'
            className="form-control"
            id="name"
            value={name}
            placeholder='Name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type='email'
            className="form-control"
            id="email"
            value={email}
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password:</label>
          <input
            type='password'
            className="form-control"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSubmit} className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
