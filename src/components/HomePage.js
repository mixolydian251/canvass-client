import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => (
  <div>
    Welcome to The Group App
    <Link to="/login">
      <button>CLICK HERE TO GO THE THE LOGIN PAGE</button>
    </Link>
  </div>
);

export default HomePage;