import React from 'react';
import PropTypes from 'prop-types';
import './photo.scss';
import {
  Card, CardMedia, Paper,
} from '@mui/material';

function Photo({
  className, title, url, ...rest
}) {
  return (
    <Paper
      className="photo className"
      {...rest}
    >
      <Card>
        <CardMedia
          component="img"
          height="200"
          image={url}
          alt={title}
        />
      </Card>

    </Paper>
  );
}

Photo.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

Photo.defaultProps = {
  className: '',
};

export default React.memo(Photo);
