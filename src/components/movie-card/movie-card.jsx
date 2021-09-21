import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
<<<<<<< Updated upstream
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
=======
      <Card className='movie-card'>
        <Card.Img src={movie.ImagePath} crossOrigin='true' />
        <Card.Body className='card-body'>
          <Card.Title>{movie.Title}</Card.Title>
          <Link to={`/movies/${movie._id}`}>
            <Button variant='danger'>View more</Button>
          </Link>
>>>>>>> Stashed changes
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
      Description: PropTypes.string,
    }),
  }),
  onMovieClick: PropTypes.func.isRequired,
};
