import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';
import Loading from '../../loading/Loading';

class MovieViewComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
    };
  }

  componentDidMount() {
    if (this.props.movie) {
      this.setState({ movie: this.props.movie });
    } else {
      this.getMovie();
    }
  }

  getMovie = () => {
    const { match, location, history } = this.props;
    let token = localStorage.getItem('token');

    axios
      .get(
        'https://nameless-retreat-07686.herokuapp.com/movies/' +
          match.params.movieId,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        this.setState({
          movie: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log(error);
      });
  };

  render() {
    const { onBackClick } = this.props;
    const { movie } = this.state;
    if (!movie) return <Loading />;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img
            src={movie.ImagePath}
            crossOrigin='true'
            style={{ width: '90%' }}
          />
        </div>
        <br />
        <div className='movie-title'>
          <h1>{movie.Title} </h1>
        </div>
        <br />
        <div>
          <h3>Description</h3>
          <p>{movie.Description}</p>
        </div>

        <div className='nav-btns'>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button className='nav-btn' variant='danger'>
              Director{' '}
            </Button>
          </Link>
          <br />
          <br />
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button className='nav-btn' variant='danger'>
              Genre
            </Button>
          </Link>
          <br />
          <br />
          <Button
            className='nav-btn'
            variant='danger'
            onClick={() => {
              onBackClick();
            }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }
}

// MovieView.propTypes = {
//   movie: propTypes.shape({
//     Title: propTypes.string.isRequired,
//     Description: propTypes.string.isRequired,
//     ImagePath: propTypes.string.isRequired,
//     Featured: propTypes.bool,
//     Genre: propTypes.shape({
//       Name: propTypes.string.isRequired,
//     }),
//     Director: propTypes.shape({
//       Name: propTypes.string.isRequired,
//     }),
//   }).isRequired,
// };

export const MovieView = withRouter(MovieViewComponent);
