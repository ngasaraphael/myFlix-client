import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import './director-view.scss';

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className='director-view'>
        <div className='director-name'>
          <h1>
            <span className='value'>{director.Name}</span>
          </h1>
        </div>
        <div className='director-bio'>
          <span className='value'>{director.Bio}</span>
        </div>

        <div className='director-birthdate'>
          <span className='value'>{director.Birthdate}</span>
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

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
  }).isRequired,
};
