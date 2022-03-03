import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import HomeIcon from '../../utils/HomeIcon';
import './header.scss';
import MenuHeader from '../MenuHeader/MenuHeader';

function Header({
  className,
  onFilterList,
  onActiveNav,
  ...rest
}) {
  // const [value, setValue] = useState('');
  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onFilterList(value);
  //   setValue('');
  // };
  const handleTrackListClick = () => {
    onFilterList('');
    // setValue('');
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
          <MenuHeader onActiveNav={onActiveNav} />
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string,
  onFilterList: PropTypes.func.isRequired,
  onActiveNav: PropTypes.func.isRequired,
};
Header.defaultProps = {
  className: '',
};
export default React.memo(Header);
