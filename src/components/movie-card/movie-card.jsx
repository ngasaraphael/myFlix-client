import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card className='main-view'>
        <Card.Img variant='top' src={movie.ImagePath} crossOrigin='true' />
        <Card.Body>
          <Button
            variant='primary'
            onClick={() => onMovieClick(movie)}
            className='movie-card'
          >
            {movie.Title}
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }),
  onMovieClick: PropTypes.func.isRequired,
};
