import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className='genre-view'>
        <div className='genre-name'>
          <h1>
            <span className='value'>{genre.Name}</span>
          </h1>
        </div>
        <div className='genre-description'>
          <span className='value'>{genre.Description}</span>
        </div>
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
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }),
};
