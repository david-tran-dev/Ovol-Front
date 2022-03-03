import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

function PositionedMenu({
  onActiveNav,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    onActiveNav(false);
  };

  return (
    <div>
      <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <Avatar sx={{ bgcolor: '#007720' }}>
          <MenuIcon />
        </Avatar>
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <NavLink
          to="/login"
        >
          <MenuItem onClick={handleClose}>Connexion</MenuItem>
        </NavLink>
        <NavLink
          to="/contact"
          className="search-bar__is-active"
        >
          <MenuItem onClick={handleClose}>Contact</MenuItem>
        </NavLink>
        <MenuItem onClick={handleClose}>Mentions Légales</MenuItem>
        <MenuItem onClick={handleClose}>A propos</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
PositionedMenu.propTypes = {
  onActiveNav: PropTypes.func.isRequired,
};

// PositionedMenu.defaultProps = {
//   className: '',
// };
export default React.memo(PositionedMenu);
