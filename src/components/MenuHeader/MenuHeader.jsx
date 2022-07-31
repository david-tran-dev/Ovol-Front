import * as React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

// Material UI
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

function MenuHeader({
  isLogged, onLogoutSubmit, onActiveNav,
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

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleLogoutSubmit = () => {
    setAnchorEl(null);
    onLogoutSubmit();
  };

  return (
    <>
      <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'start' }}>
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
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        > {!isLogged && (
        <NavLink
          to="/login"
        >
          <MenuItem onClick={handleClose}>Connexion</MenuItem>
        </NavLink>
        )}
          <NavLink
            to="/contact"
            className="search-bar__is-active"
          >
            <MenuItem onClick={handleClose}>Contact</MenuItem>
          </NavLink>
          <NavLink
            to="/legalnotice"
          >
            <MenuItem onClick={handleClose}>Mentions Légales</MenuItem>
          </NavLink>
          <NavLink
            to="/about"
          >
            <MenuItem onClick={handleClose}>A propos</MenuItem>
          </NavLink>
          {isLogged
            ? (
              <div>
                <NavLink
                  to="/adminCreate"
                >
                  <MenuItem sx={{ color: 'red' }} onClick={handleClose}>AdminCreate</MenuItem>
                </NavLink>
                <MenuItem onClick={handleLogoutSubmit}>Logout</MenuItem>
              </div>
            )
            : ''}
        </Menu>
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'start' }}>
        {!isLogged
        && (
        <NavLink
          to="/login"
        >
          <MenuItem onClick={handleClose}>Connexion</MenuItem>

        </NavLink>
        )}
        <NavLink
          to="/contact"
          className="search-bar__is-active"
        >
          <MenuItem onClick={handleClose}>Contact</MenuItem>
        </NavLink>
        <NavLink
          to="/legalnotice"
        >
          <MenuItem onClick={handleClose}>Mentions Légales</MenuItem>
        </NavLink>
        <NavLink
          to="/about"
        >
          <MenuItem onClick={handleClose}>A propos</MenuItem>
        </NavLink>
        {isLogged
          ? (
            <>
              <NavLink
                to="/adminCreate"
              >
                <MenuItem sx={{ color: 'red' }} onClick={handleClose}>AdminCreate</MenuItem>
              </NavLink>
              <MenuItem onClick={handleLogoutSubmit}>Logout</MenuItem>

            </>
          )
          : ''}

      </Box>
    </>
  );
}

MenuHeader.propTypes = {
  isLogged: PropTypes.bool.isRequired,
  onLogoutSubmit: PropTypes.func.isRequired,
  onActiveNav: PropTypes.func.isRequired,
};

export default React.memo(MenuHeader);
