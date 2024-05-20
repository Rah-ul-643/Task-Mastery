import React from 'react';
import { Link } from 'react-router-dom';
import './css/Missing.css';

const Missing = ({text,CreateBtn}) => {
  return (
    <div className='Parent Tasks'>
      <main className='Missing'>
        <h2>No {text} to display</h2>
        <p>Well, that's disappointing.</p>
        <p>
            Visit Our <Link to='/'>HomePage</Link>
        </p>
      </main>
      {CreateBtn}
    </div>
  );
};

export default Missing;
