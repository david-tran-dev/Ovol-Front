import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
// import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
// import DirectionsIcon from '@mui/icons-material/Directions';
import Avatar from '@mui/material/Avatar';
import './header.scss';

function Header({ className, ...rest }) {
  return (
    <div
      className="header"
      {...rest}
    >
      <div>O'vol</div>
      {/* <i className="fa-solid fa-circle-user" /> */}
      <Avatar src="/broken-image.jpg" />
      <Paper
        component="form"
        sx={{
          p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Ovol Maps"
          inputProps={{ 'aria-label': 'search Google Maps' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="outlined">Outlined</Button>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
};
Header.defaultProps = {
  className: '',
};
export default React.memo(Header);
