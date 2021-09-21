import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import './login-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

<<<<<<< Updated upstream
    console.log(username, password);
    props.onLoggedIn(username);
=======
    //form validation
    if (username === '' || password === '') {
      alert('Please fill all input fields');
    }

    /* Send a request to the server for authentication */
    axios
      .post('https://nameless-retreat-07686.herokuapp.com/login', {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert('Incorrect login Username or Password');
      });
>>>>>>> Stashed changes
  };

  return (
    <Form>
      <h2>Welcome to MovieApp</h2>
      <h4>Login</h4>
      <Form.Group id='formGroup'>
        <label>Username</label>
        <input
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group id='formGroup'>
        <label>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>
      <br />
      <Button
        type='submit'
        className='login-btn'
        variant='danger'
        onClick={handleSubmit}
      >
        Login
      </Button>
      <br />
      <Link to='/register' className='register-link'>
        Register an account
      </Link>
    </Form>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};
