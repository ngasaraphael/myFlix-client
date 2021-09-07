import React from 'react';
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img
            src={movie.ImagePath}
            crossOrigin='true'
            style={{ width: '100%' }}
          />
        </div>
        <br />
        <div className='movie-title'>
          <Button variant='dark' className='label'>
            Title:
          </Button>
          &nbsp;&nbsp;
          <span className='value'>{movie.Title}</span>
        </div>
        <br />
        <div className='movie-description'>
          <Button variant='dark' className='label'>
            Description:
          </Button>
          &nbsp;&nbsp;
          <span className='value'>{movie.Description}</span>
        </div>
        <br />
        <div className='movie-genre'>
          <Button variant='dark' className='label'>
            Genre:
          </Button>
          &nbsp;&nbsp;
          <span className='value'>{movie.Genre.Name}</span>
        </div>
        <br />
        <div className='movie-director'>
          <Button variant='dark' className='label'>
            Director:
          </Button>
          &nbsp;&nbsp;
          <span className='value'>{movie.Director.Name}</span>
        </div>
        <br />
        <Button
          variant='primary'
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
