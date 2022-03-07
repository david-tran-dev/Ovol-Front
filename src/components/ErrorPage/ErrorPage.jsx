import React from 'react';
import PropTypes from 'prop-types';
import './errorPage.scss';
import {
  Paper, Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

function ErrorPage({ className, ...rest }) {
  return (
    <Paper
      className="errorpage className"
      {...rest}
    >
      <Typography className="errorpage-title" variant="h1" fontWeight="bold">404</Typography>
      <Typography className="errorpage-content" variant="body1" fontSize={32} gutterBottom>Votre envol s'arrête ici!</Typography>
      <Typography variant="body1">
        <Link className="errorpage-link" to="/">
          Revenir à la page d'accueil
        </Link>
      </Typography>
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
