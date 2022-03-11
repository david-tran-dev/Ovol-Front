import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import { ThemeProvider, Button } from '@mui/material';
import customTheme from '../../themes/customTheme';

function NavHeader({
  className,
  onFilterList,
  onFiltersClick,
  ...rest
}) {
  const location = useLocation();
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
          to="/trackslist"
        >
          <Button className="header-nav__button" variant="contained" onClick={handleTrackListClick}>Randonnées </Button>
        </NavLink>
        {location.pathname === '/trackslist'
        && <Button className="header-nav__button" variant="contained" onClick={() => onFiltersClick()}>Filtres</Button>}
      </ThemeProvider>
    </div>
  );
}

NavHeader.propTypes = {
  className: PropTypes.string,
  onFilterList: PropTypes.func.isRequired,
  onFiltersClick: PropTypes.func.isRequired,
};
NavHeader.defaultProps = {
  className: '',
};

export default React.memo(NavHeader);
