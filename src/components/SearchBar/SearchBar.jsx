import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import {
  InputBase, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './searchBar.scss';
// import classnames from 'classnames';

function SearchBar({
  onFilterList,
  onActiveNav,
}) {
  const [value, setValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterList(value);
    setValue('');
    onActiveNav(false);
  };
  return (
    <div className="header-nav">
      <div>
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
    </div>
  );
}

SearchBar.propTypes = {
  // className: PropTypes.string,
  onFilterList: PropTypes.func.isRequired,
  onActiveNav: PropTypes.func.isRequired,
};
SearchBar.defaultProps = {
  // className: '',
};
export default React.memo(SearchBar);
