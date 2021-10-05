import React from 'react';
import gif from 'url:./spinner.gif';
import './Loading.module.css';

const Loading = () => {
  return (
    <div className='loading'>
      <img src={gif} alt='Loading....' style={{ width: '100%' }} />
    </div>
  );
};

export default Loading;
