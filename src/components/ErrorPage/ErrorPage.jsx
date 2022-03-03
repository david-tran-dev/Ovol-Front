import React from 'react';
import PropTypes from 'prop-types';
import './errorPage.scss';
import { Alert, AlertTitle, Paper } from '@mui/material';

function ErrorPage({ className, ...rest }) {
  return (
    <Paper
      className="errorpage className"
      {...rest}
    >
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        Cette page n'existe pas
      </Alert>
    </Paper>
  );
}

ErrorPage.propTypes = {
  className: PropTypes.string,
};
ErrorPage.defaultProps = {
  className: '',
};
export default React.memo(ErrorPage);
