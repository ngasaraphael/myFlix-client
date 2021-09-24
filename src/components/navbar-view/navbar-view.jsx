import React from 'react';
import { Link } from 'react-router-dom';
import './navbar-view.scss';

const NavbarView = () => {
  const user = localStorage.getItem('user');

  const logOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <Link className='nav-links' to='/'>
          My-Movie App
        </Link>
      </div>
      <div className='navbar-right'>
        <Link className='nav-links' to='/profile'>
          {user}
        </Link>
        <div className='signout' onClick={logOut}>
          <i className='fas fa-sign-out-alt'></i>
          <small>Signout</small>
        </div>
      </div>
    </div>
  );
};

export default NavbarView;
