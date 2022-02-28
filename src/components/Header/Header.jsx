import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import {
  InputBase, IconButton, Button, ThemeProvider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import customTheme from '../../themes/customTheme';
import HomeIcon from '../../utils/HomeIcon';
import PositionedMenu from '../MenuHeader/MenuHeader';
import './header.scss';

function Header({ className, ...rest }) {
  return (
    <div
      className="header"
      {...rest}
    >
      <div className="header-top">
        <div className="header-top__home">
          <NavLink
            to="/"
          >
            <HomeIcon sx={{ fontSize: 40, color: '#007720' }} />
          </NavLink>
        </div>
        <div className="header-top__title">O'VOL
        </div>
        <div className="header-top__avatar">
          <NavLink
            to="/login"
          >
            {/* <Avatar src="/broken-image.jpg" /> */}
            <PositionedMenu />
          </NavLink>
        </div>
      </div>
      <div className="header__input">
        <Paper
          component="form"
          sx={{
            p: '2px 4px', display: 'flex', alignItems: 'center', width: 400,
          }}
        >

          <InputBase
            sx={{
              ml: 1,
              flex: 1,
            }}
            placeholder="Search Ovol Maps"
            inputProps={{ 'aria-label': 'search Google Maps' }}
          />

          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
        </Paper>
      </div>
      <div className="header-nav">
        <ThemeProvider theme={customTheme}>
          <NavLink
            to="/carte"
          >
            <Button className="header-nav__button" variant="contained">Carte</Button>
          </NavLink>
          <NavLink
            to="/randonnees"
          >
            <Button className="header-nav__button" variant="contained">Randonnées</Button>
          </NavLink>
          <NavLink
            to="/filtres"
          >
            <Button className="header-nav__button" variant="contained">Filtres</Button>
          </NavLink>
        </ThemeProvider>
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
