// src/components/Footer.js
import React from 'react';
import './css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Task Mastery. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
