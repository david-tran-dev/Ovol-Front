import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import HomeIcon from '../../utils/HomeIcon';
import logo from '../../assets/logo.png';
import MenuHeader from '../MenuHeader/MenuHeader';

import './header.scss';

function Header({
  className,
  isLogged,
  onLogoutSubmit,
  onActiveNav,
  ...rest
}) {
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
            <HomeIcon
              sx={{ fontSize: 40, color: '#007720' }}
              onClick={() => onActiveNav(true)}
            />
          </NavLink>
        </div>

        <div className="header-top__avatar">

          <MenuHeader onActiveNav={onActiveNav} isLogged={isLogged} onLogoutSubmit={onLogoutSubmit} />
        </div>
      </div>
      <div className="header-logo-container">
        <img className="header-logo" src={logo} alt="logo paragliding" />
        <h1 className="header-top__title">O'VOL </h1>
        {isLogged && (<p className="header-top__message">Bienvenue, Admin</p>)}
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  isLogged: PropTypes.bool.isRequired,
  onLogoutSubmit: PropTypes.func.isRequired,
  onActiveNav: PropTypes.func.isRequired,
};
Header.defaultProps = {
  className: '',
};
export default React.memo(Header);
