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
      {/* <div className={classnames('header-input', { 'is-active': isActive })}>
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
      </div> */}
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
