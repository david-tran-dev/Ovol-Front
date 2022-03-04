import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../../utils/HomeIcon';
import './header.scss';
import MenuHeader from '../MenuHeader/MenuHeader';

function Header({
  className,
  onFilterList,
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
        <div className="header-top__title">O'VOL
        </div>
        {isLogged && (<p className="header-top__message">Bienvenue, Admin</p>)}
        <div className="header-top__avatar">

          <MenuHeader onActiveNav={onActiveNav} isLogged={isLogged} onLogoutSubmit={onLogoutSubmit} />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  onFilterList: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  onLogoutSubmit: PropTypes.func.isRequired,
  onActiveNav: PropTypes.func.isRequired,
};
Header.defaultProps = {
  className: '',
};
export default React.memo(Header);
