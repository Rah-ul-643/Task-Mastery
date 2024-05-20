
import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';

import axios from '../apis';
import './css/register.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password === password2) {
        const response = await axios.post('/register', {
          name,
          email,
          password
        });

        console.log(response.data);
        response.data.success ? navigate('/login') : navigate('/register')  // api sends an object {success,message}
        // display messages using toast...

      }
      else {
        console.log('Password does not match');
      }

    } catch (error) {
      console.log("Login Error", error);
    }
    finally {
      setName('');
      setPassword('');
      setEmail('');
      setPassword2('');
    }
  };

  return (
    <div className="Register register-container">
      <div className="register-form">
        <h2>Sign-Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder='Full Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder='Email ID'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Re-type Password</label>
            <input
              type="password"
              id="password2"
              placeholder='Re-Password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
        <p className="login">
          Already Registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;