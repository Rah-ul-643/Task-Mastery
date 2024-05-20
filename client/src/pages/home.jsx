import React from 'react'
import './css/home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className=" Home home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Task Mastery</h1>
        <p className="hero-description">
          Master your tasks with efficiency and ease. Join us and boost your productivity today!
        </p>
        <Link to={'/boards'}><button className="hero-button">Get Started</button></Link>
      </div>
      <div className="features-section">
        <h2 className="section-title">Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <i className="fa-solid fa-check-circle feature-icon"></i>
            <h3 className="feature-title">Organize Tasks</h3>
            <p className="feature-description">Keep your tasks well organized with our intuitive interface.</p>
          </div>
          <div className="feature-card">
            <i className="fa-solid fa-bell feature-icon"></i>
            <h3 className="feature-title">Reminders</h3>
            <p className="feature-description">Set priority and deadline to never miss a task.</p>
            <p className='feature-description'>(Coming soon)</p>
          </div>
          <div className="feature-card">
            <i className="fa-brands fa-bitbucket feature-icon"></i>
            <h3 className="feature-title">Boards</h3>
            <p className="feature-description">Organize your tasks into different categories</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;



