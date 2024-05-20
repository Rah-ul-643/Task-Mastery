
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './css/Nav.css';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {


  const handleLogOut = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('user');
  }

  return (

    <motion.nav
      className="navbar"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className='logo'>
        <Link to={'/'}>Task Mastery</Link> 
      </h1>
      <div className='nav-links-container'>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/boards">Boards</Link>
          </li>
        </ul>


        {isLoggedIn ?

          <button className="logout" onClick={handleLogOut}>
            Logout
          </button>
          :

          <ul className="nav-links">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Signup</Link>
            </li>
          </ul>
        }
      </div>



    </motion.nav>
  );
};

export default Nav;