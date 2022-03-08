/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import './filters.scss';
import { Button, Paper } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PrettoSlider from './PrettoSlider/PrettoSlider';
import {
  createDifficultyList, createMountainList, getTrackDistancetMax, getTrackHeightMax,
} from '../../utils/filterHikes';

function Filters({
  className,
  onFilterChange,
  tracksList,
  onResetFilter,
  ...rest
}) {
  const [massif, setMassif] = useState('');
  const [orientation, setOrientation] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [distance, setDistance] = useState(0);
  const [duration, setDuration] = useState(0);
  const [height, setHeight] = useState(0);

  const massifList = createMountainList(tracksList, 'mountain');
  const difficultyList = createDifficultyList(tracksList, 'difficulty');
  const heightMax = getTrackHeightMax(tracksList);
  const distanceMax = getTrackDistancetMax(tracksList);

  const handleChange = (key, value) => {
    console.log(key, value);
    if (key === 'massif') setMassif(value);
    if (key === 'orientation') setOrientation(value);
    if (key === 'difficulty') setDifficulty(value);
    if (key === 'distance') setDistance(value);
    if (key === 'duration') setDuration(value);
    if (key === 'height') setHeight(value);
  };

  useEffect(() => {
    const filters = [];
    filters.push(massif);
    filters.push(difficulty);
    filters.push(orientation);
    filters.push(distance);
    filters.push(height);
    filters.push(duration);
    console.log('dans le filters', filters);
    onFilterChange(filters);
  }, [massif, orientation, difficulty, distance, height, duration]);

  const handleResetFilter = () => {
    setMassif('');
    setOrientation('');
    setDifficulty('');
    setDistance('');
    setDuration('');
    setHeight('');
    onResetFilter();
  };
  console.log(distanceMax);
  return (
    <Paper
      className="filters className"
      {...rest}
      sx={{ display: 'flex' }}
    >

      <Box sx={{
        m: 2, width: '50%', display: 'flex', flexDirection: 'column',
      }}
      >
        <Typography>Distance</Typography>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="Distance"
          defaultValue={distanceMax}
          size="small"
          value={distance}
          min={0}
          max={distanceMax}
          onChange={(e) => handleChange('distance', e.target.value)}

        />
        <Typography>Dénivelé</Typography>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="Dénivelé"
          defaultValue={heightMax}
          size="small"
          value={height}
          min={0}
          max={heightMax}
          onChange={(e) => handleChange('height', e.target.value)}
        />
        <Typography>Durée</Typography>
        <PrettoSlider
          valueLabelDisplay="auto"
          aria-label="Durée"
          defaultValue={20}
          size="small"
          value={duration}
          onChange={(e) => handleChange('duration', e.target.value)}
        />
      </Box>
      <Box sx={{
        m: 2, width: '50%', display: 'flex', flexDirection: 'column',
      }}
      >
        <FormControl fullWidth size="small" className="filter-select">
          <InputLabel id="massif">Massif</InputLabel>
          <Select
            labelId="massif"
            id="massif-select"
            value={massif}
            label="Massif"
            onChange={(e) => handleChange('massif', e.target.value)}
          >
            {massifList.map((massif, index) => <MenuItem key={index + massif} value={massif}>{massif}</MenuItem>)}

          </Select>
        </FormControl>
        <FormControl fullWidth size="small" className="filter-select">
          <InputLabel id="orientation">Orientation</InputLabel>
          <Select
            labelId="orientation"
            id="orientation-select"
            value={orientation}
            label="Orientation"
            onChange={(e) => handleChange('orientation', e.target.value)}
          >
            <MenuItem value="N">N</MenuItem>
            <MenuItem value="E">E</MenuItem>
            <MenuItem value="S">S</MenuItem>
            <MenuItem value="O">O</MenuItem>
            <MenuItem value="NE">NE</MenuItem>
            <MenuItem value="SE">SE</MenuItem>
            <MenuItem value="SO">SO</MenuItem>
            <MenuItem value="NO">NO</MenuItem>

          </Select>
        </FormControl>
        <FormControl fullWidth size="small" className="filter-select">
          <InputLabel id="difficulty">Difficulté</InputLabel>
          <Select
            labelId="difficulty"
            id="difficulty-select"
            value={difficulty}
            label="difficulty"
            onChange={(e) => handleChange('difficulty', e.target.value)}
          >
            {difficultyList.map((difficulty, index) => <MenuItem key={index + difficulty} value={difficulty}>{difficulty}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>
      <Button onClick={handleResetFilter}>Réinitialiser</Button>
    </Paper>
  );
}

Filters.propTypes = {
  className: PropTypes.string,
  tracksList: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  onResetFilter: PropTypes.func.isRequired,
};
Filters.defaultProps = {
  className: '',
  tracksList: [],
};
export default React.memo(Filters);
