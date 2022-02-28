import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import {
  InputBase, IconButton, Button, Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import './header.scss';

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#007720',
    },
  },
});

function Header({ className, ...rest }) {
  return (
    <div
      className="header"
      {...rest}
    >
      <div className="header-top">
        <div className="header-top__title">O'VOL
        </div>
        <div className="header-top__avatar">
          <Avatar src="/broken-image.jpg" />
        </div>
      </div>

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
      <div className="header-nav">
        <Button className="header-nav__button" variant="outlined" theme={customTheme}>Carte</Button>
        <Button className="header-nav__button" variant="outlined" theme={customTheme}>Randonées</Button>
        <Button className="header-nav__button" variant="outlined" theme={customTheme}>Filtres</Button>
      </div>
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
