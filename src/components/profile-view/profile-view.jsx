import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import  Card from 'react-bootstrap/Card';
// import  Row from 'react-bootstrap/Row';
import profileImg from '../../img/profile.png';
import './profile-view.scss';

const Profile = () => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [profileData, setProfileData] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favMovie, setFavMovie] = useState('');
  const [myfavoriteMovie, setMyFavoriteMovie] = useState('');

  //get current user info
  useEffect(() => {
    axios
      .get(`https://nameless-retreat-07686.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProfileData(res.data);
        setFavMovie(res.data.favoriteMovie);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //button command to showForm or profile
  const onClick = () => {
    setShowForm(!showForm);
  };

  //edit profile command
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
      .patch(
        `https://nameless-retreat-07686.herokuapp.com/users/${username}`,

        {
          username: username,
          password: password,
          email: email,
          birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        const data = response.data;

        //remove old user and store new user
        localStorage.removeItem('user');
        localStorage.setItem('user', username);
        setShowForm(!showForm);
        window.location.reload();
        alert('Profile details have been updated');
      })
      .catch((e) => {
        console.log('Update error');
      });
  };

  //favorite Movie
  let favmovieId = favMovie[0];
  axios
    .get(
      `https://nameless-retreat-07686.herokuapp.com/movies/favorites/${favmovieId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      const data = response.data;

      setMyFavoriteMovie(data.Title);
    })
    .catch((error) => {
      console.log(error);
    });

  //delete movie from favorites
  const deleteFavorite = () => {
    if (confirm('Are you sure you want to delete movie from favorites?')) {
      axios
        .delete(
          `https://nameless-retreat-07686.herokuapp.com/users/${user}/movies/delete/${favmovieId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          const data = response.data.favoriteMovie;
          data.length = 0;
          setFavMovie(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //deregister user
  const deregister = () => {
    if (confirm('Are you sure you want to delete your account')) {
      axios
        .delete(`https://nameless-retreat-07686.herokuapp.com/users/${user}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const data = res.data;

          localStorage.removeItem('token');
          localStorage.removeItem('user');
          window.open('/', '_self');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //profile
  const profile = (
    <Fragment>
      <div className='profile'>
        <h5>My Profile</h5>
        <br />
        <div className='profile-img'>
          <img src={profileImg} alt='img' />
        </div>
        <div className='profile-info'>
          <div className='info'>
            <p className='label'>Name</p>
            <p>{profileData.username}</p>
          </div>
          <div className='info'>
            <p className='label'>Email</p>
            <p>{profileData.email}</p>
          </div>
          <div className='info'>
            <p className='label'>Date of birth</p>
            <p>{new Date(profileData.birthday).toDateString()}</p>
          </div>
        </div>
      </div>
    </Fragment>
  );

  //update form
  const updateForm = (
    <Fragment>
      <div>
        <Form>
          <h4>Edit profile</h4>
          <Form.Group id='formGroup'>
            <label className='username'>Username</label>
            <input
              required
              placeholder={profileData.username}
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
              placeholder={profileData.email}
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
              placeholder={profileData.birthday}
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
            Confirm
          </Button>
          <br />
        </Form>
      </div>
    </Fragment>
  );

  //path to update user info
  return (
    <div>
      <div className='profile-nav'>
        <div onClick={deregister} className='deregister'>
          <i className='far fa-trash-alt'></i>
          <small>Delete Profile</small>
        </div>
        <div onClick={onClick} className='edit'>
          {/* choose to render either updateform or profile */}
          <i className='fas fa-edit'></i>
          <small>Edit</small>
        </div>
      </div>

      {showForm ? updateForm : profile}

      {/* Favorite movies */}
      <div className='favorite-movies'>
        <div className='favorite-movie'>
          <i className='far fa-thumbs-up'></i>
          <small>Favorite Movies</small>
        </div>
        <div className='favorite-movie-title'>
          {myfavoriteMovie ? (
            <Button variant='primary'>{myfavoriteMovie}</Button>
          ) : (
            <Button variant='primary'>None</Button>
          )}
          <Button
            variant='danger'
            className='delete-favorite'
            onClick={deleteFavorite}
          >
            <i className='fas fa-trash-alt'></i> favorite
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
