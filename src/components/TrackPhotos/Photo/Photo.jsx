import React from 'react';
import PropTypes from 'prop-types';
import './photo.scss';
import { Paper } from '@mui/material';

function Photo({ className, ...rest }) {
  return (
    <Paper
      className="photo className"
      {...rest}
    >
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>

      <Button className="CheckButton">
        Check it out!
      </Button>
    </Paper>
  );
}

export default React.memo(Photo);
