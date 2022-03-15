import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import {
  InputBase, IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './searchBar.scss';

function SearchBar({
  onFilterList,
}) {
  const [value, setValue] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    onFilterList(value);
    setValue('');
  };
  return (
    <div className="header-nav">
      <div>
        <Paper
          onSubmit={handleSubmit}
          component="form"
          sx={{
            p: '2px 4px', display: 'flex', alignItems: 'center', width: 350,
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
  onFilterList: PropTypes.func.isRequired,
};
export default React.memo(SearchBar);
