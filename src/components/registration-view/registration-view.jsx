import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import './registration-view.scss';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(e);

    //form validation
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (username === '' || password === '' || email === '') {
      alert('Please enter all input fields');
    } else if (password.length < 6) {
      alert('Password must be more than 6 characters');
      return false;
    } else if (!email.match(re)) {
      alert('Please enter a valid email address');
    }

    axios
      .post('https://nameless-retreat-07686.herokuapp.com/users', {
        username: username,
        password: password,
        email: email,
        birthday: birthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        window.open('/', '_self');

        // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log('Registration error');
      });
  };

  return (
    <div>
      <Form>
        <h4>Register an account</h4>
        <Form.Group id='formGroup'>
          <label className='username'>Username</label>
          <input
            required
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group id='formGroup'>
          <label className='password'>Password</label>
          <input
            required
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group id='formGroup'>
          <label className='email'>Email</label>
          <input
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group id='formGroup'>
          <label className='birthdate'>Birth date</label>
          <input
            type='date'
            className='date-input'
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Button
          className='register-btn'
          variant='danger'
          type='submit'
          onClick={handleSubmit}
        >
          Register
        </Button>
        <br />
        <Link to='/' className='login-link'>
          Login
        </Link>
      </Form>
    </div>
  );
}

RegistrationView.propTypes = {
  register: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    birthday: PropTypes.string,
  }),
  onRegistration: PropTypes.func,
};
