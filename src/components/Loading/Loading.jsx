import React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './loading.scss';

function Loading() {
  return (
    <div className="loading">
      <ThreeDots type="ThreeDots" color="#2BAD60" height="100" width="100" />
    </div>

  );
}

export default React.memo(Loading);
