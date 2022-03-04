import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { ThemeProvider, Button } from '@mui/material';
import customTheme from '../../themes/customTheme';

function NavHeader({
  className,
  onFilterList,
  ...rest
}) {
  const handleTrackListClick = () => {
    onFilterList('');
  };
  return (
    <div
      className="header-nav"
      {...rest}
    >
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
  );
}

NavHeader.propTypes = {
  className: PropTypes.string,
  onFilterList: PropTypes.func.isRequired,
};
NavHeader.defaultProps = {
  className: '',
};

export default React.memo(NavHeader);
