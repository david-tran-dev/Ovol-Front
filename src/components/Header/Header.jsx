import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import classnames from 'classnames';
import {
  InputBase, IconButton, Button, ThemeProvider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import customTheme from '../../themes/customTheme';
import HomeIcon from '../../utils/HomeIcon';
import PositionedMenu from '../MenuHeader/MenuHeader';

// import filterTrack from '../App/App';
import './header.scss';

function Header({
  className,
  onFilterList,
  isActive,
  ...rest
}) {
  const [value, setValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterList(value);
    setValue('');
  };
  const handleTrackListClick = () => {
    onFilterList('');
    setValue('');
    isActive();
  };
  return (
    <div
      className="header"
      {...rest}
    >
      <div className="header-top">
        <div className="header-top__home" onClick={handleTrackListClick}>
          <NavLink
            to="/"
          >
            <HomeIcon
              sx={{ fontSize: 40, color: '#007720' }}
            />
          </NavLink>
        </div>
        <div className="header-top__title">O'VOL
        </div>
        <div className="header-top__avatar">
          <PositionedMenu isActive={isActive} />
        </div>
      </div>
      <div className={classnames('header-input', { 'is-active': isActive })}>
        <Paper
          onSubmit={handleSubmit}
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
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
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
            to="/"
          >
            <Button className="header-nav__button" variant="contained">Carte</Button>
          </NavLink>
          <NavLink
            to="/tracksList"
          >
            <Button className="header-nav__button" variant="contained" onClick={handleTrackListClick}>Randonnées </Button>
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
  onFilterList: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
};
Header.defaultProps = {
  className: '',
};
export default React.memo(Header);
