import React from 'react';
import axios from 'axios';
<<<<<<< Updated upstream
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
=======
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NavbarView from '../navbar-view/Navbar-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import Profile from '../profile-view/profile-view';
>>>>>>> Stashed changes
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

<<<<<<< Updated upstream
  // good for fetching APIs
  componentDidMount() {
=======
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  //get movies from database
  getMovies(token) {
>>>>>>> Stashed changes
    axios
      .get('https://nameless-retreat-07686.herokuapp.com/movies')
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

<<<<<<< Updated upstream
  setSelectedMovie(movie) {
    this.setState({
      selectedMovie: movie,
    });
  }

  //Register new User
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  //login user from login-view
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }
=======
  //login user from login-view
  onLoggedIn(authData) {
    this.setState({
      user: authData.user.username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  // setSelectedMovie(movie) {
  //   this.setState({
  //     selectedMovie: movie,
  //   });
  // }
>>>>>>> Stashed changes

  render() {
    const { movies, selectedMovie, user, register } = this.state;

<<<<<<< Updated upstream
    /* (!newregister): onRegistration is rendered ? LoginView*/

    //COMMENTED OUT FOR NOW

    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
        />
      );

    /* (!user): LoginView is rendered ?user details*/
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Before the movies have been loaded
    if (movies.length === 0) return <div className='main-view' />;

    return (
      /*(!selectedMovie): return selected movie ? return all movies */
      <Row className='main-view justify-content-md-center'>
        {selectedMovie ? (
          <Col md={6}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={4}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
      </Row>
=======
    // if (!user)
    //   return (
    //     <Row>
    //       <Col>
    //         <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    //       </Col>
    //     </Row>
    //   );
    // if (movies.length === 0) return <div className='main-view' />;

    return (
      <Router>
        {user && <NavbarView />}
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path='/'
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return movies.map((m) => (
                <Col md={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          {/* register new user */}
          <Route
            path='/register'
            render={() => {
              if (user) return <Redirect to='/' />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* User's Profile */}
          <Route
            path='/profile'
            render={() => {
              return (
                <Col>
                  <Profile movies={movies} />
                </Col>
              );
            }}
          />

          {/* //route to single movie */}
          <Route
            path='/movies/:movieId'
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* route to movie genre */}
          <Route
            path='/genres/:name'
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <GenreView
                    genre={
                      movies.find(
                        (movie) => movie.Genre.Name === match.params.name
                      ).Genre
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          {/* Directores route */}
          <Route
            path='/directors/:name'
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find(
                        (movie) => movie.Director.Name === match.params.name
                      ).Director
                    }
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
>>>>>>> Stashed changes
    );
  }
}
