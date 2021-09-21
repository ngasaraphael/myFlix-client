import React from 'react';
import Button from 'react-bootstrap/Button';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
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

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Featured: propTypes.bool,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
    }),
  }).isRequired,
};
