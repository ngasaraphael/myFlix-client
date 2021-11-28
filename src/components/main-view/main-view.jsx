import React from 'react';
import axios from 'axios';

import { connect } from 'react-redux';
// #0
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import NavbarView from '../navbar-view/Navbar-view';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { GenreView } from '../genre-view/genre-view';
import { DirectorView } from '../director-view/director-view';
import { RegistrationView } from '../registration-view/registration-view';
import Profile from '../profile-view/profile-view';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Switch from 'react-bootstrap/esm/Switch';

// #2 export keyword removed from here
class MainView extends React.Component {
  constructor() {
    super();

    // #3 movies state removed from here
    this.state = {
      // movies: [],
      selectedMovie: null,
      user: null,
      register: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      let user = localStorage.getItem('user');
      this.props.setUser(user);
      this.getMovies(accessToken);
    }
  }

  //get movies from database
  getMovies(token) {
    axios
      .get('https://nameless-retreat-07686.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //login user from login-view
  onLoggedIn(authData) {
    this.props.setUser(authData.user.username);
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.username);
    this.getMovies(authData.token);
  }

  render() {
    // #5 movies is extracted from this.props rather than from the this.state
    let { movies, user } = this.props;

    if (!user)
      return (
        <Router>
          <Switch>
            <Col>
              <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
            </Col>
          </Switch>
        </Router>
      );

    return (
      <Router>
        {user && <NavbarView />}
        <Row className='main-view justify-content-md-center'>
          <Route
            exact
            path='/'
            render={() => {
              if (movies.length === 0) return <div className='main-view' />;
              // #6
              return <MoviesList movies={movies} />;
            }}
          />

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

          <Route
            path='/movies/:movieId'
            render={({ match, history }) => {
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m.Title === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

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
    );
  }
}

// #7
let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.getUser };
};

// #8
export default connect(mapStateToProps, { setMovies, setUser })(MainView);
