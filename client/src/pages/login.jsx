import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css';
import axios from '../apis';

const Login = ({setIsLoggedIn}) => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/login', {
                email,
                password
            });

            console.log(response.data);
            if (response.data.success) {
                const user = response.data.user;
                localStorage.setItem('user', JSON.stringify(user));
                setIsLoggedIn(true);
                
            } else {
                console.log(response.data.message);
                navigate('/login')                          // api sends an object {user, success, message}
            }

        } catch (error) {
            console.log("Login Error", error);
        }
        finally {
            setPassword('');
            setEmail('');
        }
    };

    return (
        <div className="login-container Login">
            <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Registered Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required

                        />
                    </div>
                    <button type="submit" className="btn">Login</button>
                </form>
                <p className="forgot-password">
                    Forgot your password? <a href="/reset">Reset it here</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
