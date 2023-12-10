import { Spinner } from 'react-bootstrap';

import React from 'react';

const SpinnerLoad = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        width: '100px',
        height: '100px',
        margin: 'auto',
        display: 'block',
      }}
    >
      <span className="sr-only"></span>
    </Spinner>
  );
};

export default SpinnerLoad;
